import { CreateExerciseDto } from 'src/exercises/dto/create-exercise.dto';

export class CreateRoutineDto {
  id: number;
  description: string;
  exercises: CreateExerciseDto[];
}
