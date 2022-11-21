import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.rolesRepository.save(createRoleDto);
    return role;
  }

  async findRoles() {
    const roles = await this.rolesRepository.find();
    return roles;
  }

  async findRole(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    return role;
  }

  async updateRole(id: number, createRoleDto: CreateRoleDto) {
    const role = await this.rolesRepository.update(id, createRoleDto);
    return role;
  }

  async removeRole(id: number) {
    const role = await this.rolesRepository.delete(id);
    return role;
  }
}
