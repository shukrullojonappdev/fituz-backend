import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { User } from 'src/users/entities/user.entity';
import { Routine } from 'src/routines/entities/routine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, User, Routine])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
