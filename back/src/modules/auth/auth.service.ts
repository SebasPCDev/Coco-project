import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginUserDto, RecoveryPassDto } from './auth.dto';
import { UUID } from 'crypto';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
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

  async forgotPassword(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new BadRequestException('Verifique su dirección de email');

    const payload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    await this.usersService.update(user.id as UUID, {
      recoveryToken: token,
    });

    const link = `${process.env.NODEMAILER_FRONT_URL}/recovery-password?token=${token}`;

    this.nodemailerService.forgotPassEmailRequest(email, user.name, link);
  }

  async recoveryPass(data: RecoveryPassDto) {
    const { token, password } = data;

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });

      const user = await this.usersService.findOne(payload.id);

      if (user.recoveryToken !== token)
        throw new BadRequestException('Token inválido');

      const updUser = await this.usersService.update(payload.id, {
        password,
        recoveryToken: null,
      });

      return updUser;
    } catch (error) {
      throw new BadRequestException('Token inválido');
    }
  }
}
