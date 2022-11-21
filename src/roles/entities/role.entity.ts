import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@Entity('role')
export class Role {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Уникальный идентификатор' })
  @Column({ unique: true, nullable: false, type: 'varchar' })
  value: string;

  @Column({ nullable: false, type: 'varchar' })
  description: string;

  @ApiProperty({
    example: '2022-10-03T03:53:18.191Z',
    description: 'Дата создания роли',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2022-10-03T03:53:18.191Z',
    description: 'Дата обновления роли',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
