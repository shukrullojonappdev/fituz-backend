import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/entities/role.entity';
import { Exclude } from 'class-transformer';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Routine } from 'src/routines/entities/routine.entity';

@Entity('user')
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'username',
    description: 'Название аккаунта',
    required: true,
  })
  @Column({ nullable: false, type: 'varchar' })
  username: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'Электронная почта',
    required: true,
  })
  @Column({ unique: true, nullable: false, type: 'varchar' })
  email: string;

  @ApiProperty({ example: 'password', description: 'Пароль' })
  @Column({ nullable: false, type: 'varchar' })
  @Exclude()
  password: string;

  @ApiProperty({ example: 'false', description: 'Бан', required: false })
  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @ApiProperty({ example: '', description: 'Причина бана' })
  @Column({ nullable: true, type: 'varchar' })
  banReason: string;

  @ApiProperty({ description: 'Токен' })
  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @ApiProperty({
    example: '2022-10-03T03:53:18.191Z',
    description: 'Дата создания пользователя',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2022-10-03T03:53:18.191Z',
    description: 'Дата обновления пользователя',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: {
      id: 1,
      value: 'USER',
      describtion: 'user role',
    },
    description: 'Роли пользователя',
  })
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'userRoles' })
  roles: Role[];

  @ManyToMany(() => Exercise, (exercise) => exercise.users)
  @JoinTable({ name: 'userExercises' })
  exercises: Exercise[];

  @ManyToMany(() => Routine, (routine) => routine.users)
  @JoinTable({ name: 'userRoutines' })
  routines: Routine[];
}
