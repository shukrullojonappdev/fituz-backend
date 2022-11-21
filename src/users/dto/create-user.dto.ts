import { Role } from 'src/roles/entities/role.entity';
import { IsString, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Название аккаунта',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'Электронная почта',
    required: true,
  })
  email: string;

  @ApiProperty({ example: 'password', description: 'Пароль', required: true })
  password: string;

  refreshToken: string;

  roles: Role[];
}
