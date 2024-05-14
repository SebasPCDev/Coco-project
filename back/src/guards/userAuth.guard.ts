import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/roles.enum';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('paramId', request.params);
    const paramId = request.params.id;
    if (paramId) {
      if (paramId !== user.id && !user.roles.includes(Role.SUPERADMIN))
        throw new ForbiddenException('You do not have permission and are not allowed to access this route');
    }

    return true;
  }
}
