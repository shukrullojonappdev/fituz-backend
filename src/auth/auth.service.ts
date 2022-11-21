import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    if (user) {
      const tokens = await this.getTokens(user);

      const hashRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
      await this.usersService.updateUser(user.id, {
        refreshToken: hashRefreshToken,
      });

      return tokens;
    }
    throw new HttpException(
      'email или пароль неправилно',
      HttpStatus.BAD_REQUEST,
    );
  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashPassword,
    });

    const tokens = await this.getTokens(user);
    const hashRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersService.updateUser(user.id, {
      refreshToken: hashRefreshToken,
    });

    return tokens;
  }

  async logout(userId: number) {
    return await this.usersService.updateUser(userId, { refreshToken: null });
  }

  private async validateUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.findUserByEmail(createUserDto.email);
    const passwordEquals = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'asdfsdg' });
  }

  private async getTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findUserById(userId);
    const refreshTokenEquals = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (user && user.refreshToken) {
      const tokens = await this.getTokens(user);

      const hashRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
      await this.usersService.updateUser(user.id, {
        refreshToken: hashRefreshToken,
      });

      return tokens;
    }
    throw new ForbiddenException('asdsdgfg');
  }
}
