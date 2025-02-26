/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { CurrentUserDto } from '../models/auth.model';

export function PermissionsGuard(permission: string): Type<CanActivate> {
  class PermissionsGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user: CurrentUserDto = request.user;
      const userPermissions = user?.permissions || [];

      return userPermissions.includes(permission);
    }
  }

  return PermissionsGuardMixin;
}
