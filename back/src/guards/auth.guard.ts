import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

// Reflector nos permite conocer la metadata
// Se inyecta a través de inuección de dependencias
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
// import { Role } from 'src/models/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Incorporamos la metadata desde el contexto
    // con el nombre que colocamos en los endpoints
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    // Si es publicó no valido el token
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    if (!token) throw new UnauthorizedException('No autorizado');

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);

      // Verificamos que el paramId coincida con el id del token
      // Excepto para el endpoint de orders
      // console.log('request', request);
      // console.log(
      //   'payload.roles.includes(Role.ADMIN)',
      //   payload.roles.includes(Role.ADMIN),
      // );

      // console.log('paramId', request.params);
      // const paramId = request.params.id;
      // if (paramId) {
      //   if (paramId !== payload.id && !payload.roles.includes(Role.ADMIN))
      //     throw new UnauthorizedException('Unauthorized');
      // }

      request.user = payload;

      return true;
    } catch (err) {
      if (!token) throw new UnauthorizedException('No autorizado');
    }
  }
}
