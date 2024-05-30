import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUsersDto, UpdateDto, UpdateUsersDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.entity';
import { FindOptionsOrderValue, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Role } from 'src/models/roles.enum';
import { UpdateBookingsDto } from '../bookings/bookings.dto';
import { BookingStatus } from 'src/models/bookingStatus';
import { BookingsService } from '../bookings/bookings.service';
import { UserStatus } from 'src/models/userStatus.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly bookingsService: BookingsService,
    private readonly jwtService: JwtService,
  ) { }

  async create(data: CreateUsersDto) {
    const user = await this.getUserByEmail(data.email);
    if (user) throw new BadRequestException('Usuario existente');

    const newUserTemp = this.usersRepository.create(data);
    const newUser = await this.usersRepository.save(newUserTemp);

    return newUser;
  }

  async findAll(
    status?: UserStatus,
    name?: string,
    role?: Role,
    page?: number,
    limit?: number,
  ) {
    const where: FindOptionsWhere<Users> = {};

    if (status) where.status = status;
    if (name) where.name = name;
    if (role) where.role = role;

    const conditions: any = {
      where,
      order: { updatedAt: 'DESC' as FindOptionsOrderValue },
    };

    if (page && limit) {
      const skip = (page - 1) * limit;
      conditions.skip = skip;
      conditions.take = limit;
    }

    const [users, total] = await this.usersRepository.findAndCount(conditions);
    return { page, limit, total, users };
  }

  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async findOne(id: UUID) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['coworkings', 'employee', 'employee.company', 'bookings'],
    });

    if (!user) throw new BadRequestException('Usuario no encontrado');
    return user;
  }

  async updateBooking(
    userId: UUID,
    bookingId: UUID,
    changes: UpdateBookingsDto,
  ) {
    console.log(userId, bookingId, changes);
    const booking = await this.bookingsService.findOne(bookingId);
    if (booking.user.id !== userId)
      throw new ForbiddenException(
        'No tienes permisos para modificar esta resevación',
      );

    if (booking.status !== BookingStatus.PENDING)
      throw new BadRequestException(
        'El estado de la reserva no se puede modificar',
      );

    if (changes.status !== BookingStatus.USER_CANCELED) {
      throw new BadRequestException(
        'El estado de la reserva no se puede modificar',
      );
    }

    //!mail a coworking y a empleado  que  se actulizo la reserva
    //? Hacer prueba

    const updBooking = await this.bookingsService.update(bookingId, changes);
    return updBooking;
  }

  async checkIn(userId: UUID, bookingId: UUID) {
    const booking = await this.bookingsService.findOne(bookingId);
    if (booking.user.id !== userId)
      throw new ForbiddenException(
        'No tienes permisos para modificar esta resevación',
      );

    if (booking.status !== BookingStatus.ACTIVE)
      throw new BadRequestException(
        `El estado de la reserva esta en: ${booking.status}, no se puede modificar`,
      );

    booking.confirmUser = true;
    if (booking.confirmCoworking === true) {
      booking.status = BookingStatus.COMPLETED;
    }
    const updBooking = await this.bookingsService.update(bookingId, booking);
    return updBooking;
  }

  async checkInByEmail(token: string) {
    const secret = process.env.JWT_SECRET;
    let payload;
    try {
      payload = this.jwtService.verify(token, { secret });

    } catch (error) {
      throw new BadRequestException("Token inválido")
    }

    const booking = await this.bookingsService.findOne(payload.bookingId);
    if (booking.user.id !== payload.id)
      throw new ForbiddenException(
        'No tienes permisos para modificar esta resevación',
      );

    if (booking.status !== BookingStatus.ACTIVE)
      throw new BadRequestException(
        `El estado de la reserva esta en: ${booking.status}, no se puede modificar`,
      );

    booking.confirmUser = true;
    if (booking.confirmCoworking === true) booking.status = BookingStatus.COMPLETED;

    const updBooking = await this.bookingsService.update(booking.id as UUID, booking);
    return updBooking;
  }

  async update(id: UUID, changes: UpdateUsersDto) {
    const user = await this.findOne(id);

    if (changes.password) {
      const hashedPass = await bcrypt.hash(changes.password, 10);
      changes = { ...changes, password: hashedPass };
      if (!user.activationDate)
        changes = { ...changes, activationDate: new Date() };
    }

    const updUser = this.usersRepository.merge(user, changes);
    return this.usersRepository.save(updUser);
  }

  //! Actualiza el susuario sin contraseña
  async updateUser(id: UUID, changes: UpdateDto) {
    const user = await this.findOne(id);
    const updUser = this.usersRepository.merge(user, changes);
    return this.usersRepository.save(updUser);
  }
}
