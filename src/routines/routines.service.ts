import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from 'src/exercises/dto/create-exercise.dto';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entities/routine.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine) private routinesRepository: Repository<Routine>,
    private exercisesService: ExercisesService,
  ) {}

  async createRoutine(createRoutineDto: CreateRoutineDto, creatorId: number) {
    const routine = await this.routinesRepository.create(createRoutineDto);
    const exercises = await this.exercisesService.createExercise(
      createRoutineDto.exercises,
      creatorId,
    );
    routine.creatorId = creatorId;
    routine.exercises.push(exercises);
    await this.routinesRepository.save(routine);
    return routine;
  }

  findAll() {
    return `This action returns all routines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routine`;
  }

  update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return `This action updates a #${id} routine`;
  }

  remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}
