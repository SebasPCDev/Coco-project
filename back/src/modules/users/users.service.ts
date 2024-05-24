import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUsersDto, UpdateDto, UpdateUsersDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Role } from 'src/models/roles.enum';
import { UpdateBookingsDto } from '../bookings/bookings.dto';
import { BookingStatus } from 'src/models/bookingStatus';
import { BookingsService } from '../bookings/bookings.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly bookingsService: BookingsService,
  ) { }

  async create(data: CreateUsersDto) {
    const user = await this.getUserByEmail(data.email);
    if (user) throw new BadRequestException('Usuario existente');

    const newUserTemp = this.usersRepository.create(data);
    const newUser = await this.usersRepository.save(newUserTemp);

    return newUser;
  }

  async findAll() {
    const user = await this.usersRepository.find();
    return user;
  }

  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async findOne(id: UUID) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['coworkings', 'employee', 'employee.company'],
    });

    if (!user) throw new BadRequestException('Usuario no encontrado');
    return user;
  }

  async updateBooking (userId: UUID, bookingId: UUID, changes: UpdateBookingsDto) {
    console.log(userId, bookingId, changes);
    const booking = await this.bookingsService.findOne(bookingId)

    if (booking.user.id !== userId) throw new ForbiddenException('No tienes permisos para modificar esta resevación')

    if (booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.NO_SHOW || booking.status === BookingStatus.USER_CANCELED) 
      throw new BadRequestException('El estado de la reserva no se puede modificar')

    if (changes.status === BookingStatus.ACTIVE || changes.status === BookingStatus.USER_CANCELED) {
      if (booking.status !== BookingStatus.PENDING) 
        throw new BadRequestException('El estado de la reserva debe ser Pendiente para modificarlo')
     }

    if (changes.status === BookingStatus.COMPLETED) {
      if (booking.status !== BookingStatus.ACTIVE) 
        throw new BadRequestException('El estado de la reserva debe ser Activo para confirmar el check-in')
    }

    const updBooking = await this.bookingsService.update(bookingId, changes)
    return updBooking
  }

  async update(id: UUID, changes: UpdateUsersDto) {
     const user = await this.findOne(id);

     if (changes.password) {
      const hashedPass = await bcrypt.hash(changes.password, 10);
      changes = { ...changes, password: hashedPass };
      if (!user.activationDate) changes = { ...changes, activationDate: new Date() };
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

  async preloadSuperAdminUser() {
    const hashedPassword = await bcrypt.hash(
      process.env.SUPERADMIN_PASSWORD,
      10,
    );

    const adminUser = {
      name: process.env.SUPERADMIN_NAME,
      lastname: process.env.SUPERADMIN_LASTNAME,
      phone: process.env.SUPERADMIN_PHONE,
      email: process.env.SUPERADMIN_EMAIL,
      identification: process.env.SUPERADMIN_IDENTIFICATION,
      position: process.env.SUPERADMIN_POSITION,
      password: hashedPassword,
      role: Role.SUPERADMIN,
    };

    const userTemp = await this.usersRepository.findOne({
      where: { email: adminUser.email },
    });

    if (!userTemp) {
      console.log('Admin user has been created...');
      return await this.usersRepository.save(adminUser);
    }
    console.log('Admin user already exists...');
  }
}
