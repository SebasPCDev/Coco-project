import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/models/roles.enum';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class UserAuthCompanyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === Role.SUPERADMIN) return true;

    const paramId = request.params.id;
    if (!paramId) throw new BadRequestException('Id no encontrado');

    const dbUser = await this.usersService.findOne(user.id);

    if (!dbUser.employee) throw new ForbiddenException('No tienes acceso a este recurso')

    const valid = dbUser.employee.company.id === paramId;

    if (!valid)
      throw new ForbiddenException(
        'No tienes permiso y no puedes acceder a este recurso',
      );

    return valid;
  }
}
