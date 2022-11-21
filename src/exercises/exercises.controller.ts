import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@ApiTags('Упражнения')
@Roles('User')
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @ApiOperation({ summary: 'Создание нового упражнения' })
  @Get()
  findExercises() {
    return this.exercisesService.findExercises();
  }

  @ApiOperation({ summary: 'Создание нового упражнения' })
  @Get(':id')
  findExercise(@Param('id') id: string) {
    return this.exercisesService.findExercise(+id);
  }

  @ApiOperation({ summary: 'Создание нового упражнения' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @ApiOperation({ summary: 'Создание нового упражнения' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
