import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
  ) {}

  async createExercise(
    createExerciseDto: CreateExerciseDto,
    creatorId: number,
  ) {
    const exercise = await this.exercisesRepository.create(createExerciseDto);
    exercise.creatorId = creatorId;
    await this.exercisesRepository.save(exercise);
    return exercise;
  }

  async findExercises() {
    const exercises = await this.exercisesRepository.find();
    return exercises;
  }

  async findExercise(id: number) {
    const exercise = await this.exercisesRepository.findOne({ where: { id } });
    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  async remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
