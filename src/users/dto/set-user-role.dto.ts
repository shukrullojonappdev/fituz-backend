import { ApiProperty } from '@nestjs/swagger';

export class setUserRoleDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  roleValue: string;
}
