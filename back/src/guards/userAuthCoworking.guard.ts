import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CoworkingsService } from 'src/modules/coworkings/coworkings.service';

@Injectable()
export class UserAuthCoworkingGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly coworkingsService: CoworkingsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const paramId = request.params.id;

    if (!paramId) throw new BadRequestException('Id no encontrado');
    const dbCoworking = await this.coworkingsService.getCoworkingById(paramId);

    const valUser = dbCoworking.user.findIndex(
      (coworkingAdmin) => coworkingAdmin.id === user.id,
    );
    if (valUser === -1)
      throw new ForbiddenException(
        'No tienes permiso y no puedes acceder a esta ruta',
      );

    const valid = user && valUser !== -1;

    if (!valid)
      throw new ForbiddenException(
        'No tienes permiso y no puedes acceder a esta ruta',
      );

    return valid;
  }
}
