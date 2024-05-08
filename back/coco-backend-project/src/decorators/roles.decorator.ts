// importamos el inyectador de metadata
import { SetMetadata } from '@nestjs/common';

// nos traemos al enum role
import { Role } from '../models/roles.enum';

// creamos una llave indicadora
export const ROLES_KEY = 'roles';

// creamos un decorador en el que recibiremos un arreglo de roles
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
