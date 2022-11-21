import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Auth()
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get('/:value')
  findRole(@Param('value') value: string) {
    return this.rolesService.findRole(value);
  }

  @Get()
  findRoles() {
    return this.rolesService.findRoles();
  }

  @Post()
  updateRole(@Param('id') id: number, @Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.updateRole(id, createRoleDto);
  }

  @Delete(':id')
  removeRole(@Param('id') id: number) {
    return this.rolesService.removeRole(id);
  }
}
