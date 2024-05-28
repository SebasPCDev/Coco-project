import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/roles.enum';
import { Observable } from 'rxjs';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const paramId = request.params.id;
    if (paramId) {
      if (paramId !== user.id && !user.role.includes(Role.SUPERADMIN))
        throw new ForbiddenException(
          'No tienes permiso y no puedes acceder a esta ruta',
        );
    }
    return true;
  }
}
