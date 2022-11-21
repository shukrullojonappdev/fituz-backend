import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { setUserRoleDto } from './dto/set-user-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    const role = await this.rolesService.findRole('USER');
    user.roles = [role];
    await this.usersRepository.save(user);
    return user;
  }

  async findUsers() {
    const users = await this.usersRepository.find({
      relations: { roles: true },
    });
    return users;
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: { roles: true },
    });
    if (user) {
      return user;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
  }

  async findUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
    if (user) {
      return user;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
  }

  async addUserRole(setUserRoleDto: setUserRoleDto) {
    const user = await this.usersRepository.findOne({
      where: { id: setUserRoleDto.userId },
      relations: { roles: true },
    });
    const role = await this.rolesService.findRole(setUserRoleDto.roleValue);
    if (user && role) {
      user.roles.push(role);
      user.updatedAt = new Date(Date.now());
      await this.usersRepository.save(user);
      return setUserRoleDto;
    }
    throw new HttpException(
      'Пользователь или роль не найден',
      HttpStatus.BAD_REQUEST,
    );
  }

  async removeUserRole(setUserRoleDto: setUserRoleDto) {
    const user = await this.usersRepository.findOne({
      where: { id: setUserRoleDto.userId },
      relations: { roles: true },
    });
    const role = await this.rolesService.findRole(setUserRoleDto.roleValue);
    if (user && role) {
      const valueIndex = user.roles.findIndex(
        (value) => value.value === setUserRoleDto.roleValue,
      );
      user.roles.splice(valueIndex, valueIndex >= 0 ? 1 : 0);
      user.updatedAt = new Date(Date.now());
      await this.usersRepository.save(user);
      return setUserRoleDto;
    }
    throw new HttpException(
      'Пользователь или роль не найден',
      HttpStatus.BAD_REQUEST,
    );
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, {
      ...updateUserDto,
    });
    return user;
  }

  async removeUser(id: number) {
    const user = await this.usersRepository.delete(id);
    return user;
  }
}
