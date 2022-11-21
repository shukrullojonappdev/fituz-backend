import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { User } from 'src/users/entities/user.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine, User, Exercise]),
    ExercisesModule,
  ],
  controllers: [RoutinesController],
  providers: [RoutinesService],
})
export class RoutinesModule {}
