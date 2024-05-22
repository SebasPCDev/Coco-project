import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new BadRequestException('Usuario no encontrado');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new BadRequestException('Contraseña invalida');

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generamos un token
    const token = this.jwtService.sign(userPayload);

    return { user, token };
  }
}
