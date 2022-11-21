import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { Routine } from 'src/routines/entities/routine.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Routine, Exercise]),
    RolesModule,
    JwtModule,
  ],
})
export class UsersModule {}
