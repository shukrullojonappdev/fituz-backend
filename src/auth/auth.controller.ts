import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Вход в аккаунт' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'email или пароль неправилно',
  })
  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь удачно зарегистрировался',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Пользователь уже существует',
  })
  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @Auth()
  @ApiOperation({ summary: 'Выход из аккаунта' })
  @Get('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Обновление токена' })
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
