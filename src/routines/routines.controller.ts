import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('')
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  createRoutine(
    @Body() createRoutineDto: CreateRoutineDto,
    @Req() req: Request,
  ) {
    const creator = req.user['sub'];
    return this.routinesService.createRoutine(createRoutineDto, creator);
  }

  @Get()
  findAll() {
    return this.routinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
    return this.routinesService.update(+id, updateRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routinesService.remove(+id);
  }
}
