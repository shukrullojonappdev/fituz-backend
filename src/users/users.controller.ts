import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { setUserRoleDto } from './dto/set-user-role.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Пользователи')
@Auth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь удачно создан',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Пользователь не создан',
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findUsers() {
    return this.usersService.findUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(+id);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }

  @ApiOperation({ summary: 'Добавление роли пользователя' })
  @Post('addRole')
  addUserRole(@Body() setUserRoleDto: setUserRoleDto) {
    return this.usersService.addUserRole(setUserRoleDto);
  }

  @ApiOperation({ summary: 'Удаление роли пользователя' })
  @Post('removeRole')
  removeUserRole(@Body() setUserRoleDto: setUserRoleDto) {
    return this.usersService.removeUserRole(setUserRoleDto);
  }
}
