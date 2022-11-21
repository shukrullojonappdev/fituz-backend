import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export function Auth() {
  return applyDecorators(
    Roles('ADMIN'),
    ApiBearerAuth(),
    UseGuards(AccessTokenGuard, RolesGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
