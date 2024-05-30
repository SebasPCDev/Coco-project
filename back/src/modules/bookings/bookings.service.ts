import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { UUID } from 'crypto';
import { CreateBookingsDto, UpdateBookingsDto } from './bookings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Bookings } from 'src/entities/bookings.entity';
import { timeToMinutes } from 'src/helpers/timeToMinutes';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { Employees } from 'src/entities/employees.entity';
import { Role } from 'src/models/roles.enum';
import { BookingStatus } from 'src/models/bookingStatus';
import { In } from 'typeorm';
import { UserStatus } from 'src/models/userStatus.enum';

// import { Role } from 'src/models/roles.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Coworkings)
    private coworkingsRepository: Repository<Coworkings>,
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
    private readonly nodemailerService: NodemailerService,
  ) { }

  async findAll() {
    const bookings = await this.bookingsRepository.find();
    return bookings;
  }

  async findOne(id: UUID) {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: ['user', 'coworking'],
    });
    if (!booking) throw new BadRequestException('Reserva no encontrada');
    return booking;
  }

  async create(userId: UUID, data: CreateBookingsDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['employee', 'bookings'],
    });
    if (!user) throw new BadRequestException('Usuario no encontrado');
    if (user.status !== UserStatus.ACTIVE)
      throw new BadRequestException('Usuario no habilitado');

    const coworking = await this.coworkingsRepository.findOne({
      where: { id: data.coworkingId },
      relations: ['user'],
    });
    if (!coworking) throw new BadRequestException('Coworking no encontrado');

    const openTimeMinutes = timeToMinutes(coworking.open);
    const closeTimeMinutes = timeToMinutes(coworking.close);
    const reservationTimeMinutes = timeToMinutes(data.reservationTime);

    // Comparar las horas en minutos
    if (
      reservationTimeMinutes < openTimeMinutes ||
      reservationTimeMinutes > closeTimeMinutes
    ) {
      throw new BadRequestException(
        'La hora de reserva es antes de la apertura o después del cierre del coworking.',
      );
    }
    //! Descontar pases
    console.log('entra a descontar pases');

    const employee = await this.employeesRepository.findOneBy({
      id: user.employee.id,
    });
    if (!employee) {
      throw new BadRequestException(
        `No se encontro el empleado con id en la tabla eployee, con id: ${user.employee.id}`,
      );
    }
    if (user.employee.passesAvailable <= 0) {
      throw new BadRequestException(`cliente con pases 0`);
    }
    const bookings = await this.bookingsRepository.find({
      where: {
        user: { id: userId },
        coworking: { id: coworking.id },
        //activo
        status: In([BookingStatus.PENDING, BookingStatus.ACTIVE]),
        //el dia
        reservationDate: data.reservationDate,
      },
      relations: ['user', 'coworking'],
    });
    if (bookings.length > 0) {
      throw new BadRequestException(
        `Tiene una o mas reservas en pendiente o activo en el mismo dia `,
      );
    }
    const pasesUp = user.employee.passesAvailable - 1;
    console.log(pasesUp);

    if (pasesUp < 0) {
      throw new BadRequestException(`cliente con pases 0`);
    }
    await this.employeesRepository.update(user.employee.id, {
      passesAvailable: pasesUp,
    });

    const newData = { ...data, user, coworking };
    const newBooking = this.bookingsRepository.create(newData);
    const booking = await this.bookingsRepository.save(newBooking);

    //!Enviar mensaje de descuento de pases

    this.nodemailerService.SendNotificationPasesEmployee(
      coworking.name,
      user.name,
      pasesUp,
      user.employee.passes,
      booking.reservationDate,
      booking.reservationTime,
      coworking.address,
      user.email,
    );

    //! mail  a user  info: reserva pendieynte de confirmacion (nombre direccion dia y hora)
    this.nodemailerService.NotificationBookingEmployee(
      coworking.name,
      user.name,
      user.email,
      booking.reservationDate,
      booking.reservationTime,
      coworking.address
    )
    //! mail a  coworking info quieren reservar dia horario (user apellido dni date hora )
    this.nodemailerService.NotificationBookingCoworking(
      coworking.name,
      user.name,
      user.lastname,
      booking.reservationDate,
      booking.reservationTime,
      coworking.email,
    );
    console.log(user.bookings);
    return booking;
  }

  async update(id: UUID, changes: UpdateBookingsDto) {
    const booking = await this.findOne(id);

    const updBooking = this.bookingsRepository.merge(booking, changes);
    return await this.bookingsRepository.save(updBooking);
  }
  //! Servicio para canclar booking ->  envia mensaje y cancela el bookign(segun  el tipo de rol)
  async CancelBooking(id: UUID, userId: UUID) {
    const booking = await this.bookingsRepository.findOne({
      where: { id: id },
      relations: ['user', 'coworking', 'user.employee'],
    });
    console.log(booking);
    if (!booking) throw new BadRequestException('Reserva no encontrada');

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['bookings', 'coworkings', 'employee'],
    });

    if (!user) throw new BadRequestException('Usuario no encontrado');

    if (user.role === Role.EMPLOYEE) {
      console.log('El usuario cancelo');

      console.log(booking.user.id);
      //!Con esto se asegura que el usuario que genero la reserva sea el que la cancela
      if (booking.user.id !== userId) {
        throw new BadRequestException(
          `Booking con id ${booking.id} no pertenece al usuario con id ${userId} `,
        );
      }
      if (
        booking.status === BookingStatus.USER_CANCELED ||
        booking.status === BookingStatus.COWORKING_CANCELED ||
        booking.status === BookingStatus.COMPLETED
      ) {
        throw new BadRequestException(
          `Tu reserva ya esta en un estado de : ${booking.status}`,
        );
      }
      const employee = await this.employeesRepository.findOneBy({
        id: user.employee.id,
      });
      if (!employee) {
        throw new BadRequestException(
          `No se encontro el empleado con id en la tabla eployee, con id: ${user.employee.id}`,
        );
      }
      await this.employeesRepository.update(employee.id, {
        passesAvailable: employee.passesAvailable + 1,
      });
      await this.bookingsRepository.update(booking.id, {
        status: BookingStatus.USER_CANCELED,
      });
      this.nodemailerService.sendCancelBooking(
        booking.coworking.name,
        user.name,
        user.name,
        booking.reservationDate,
        booking.reservationTime,
        booking.coworking.address,
        user.email,
      );
      return { mesage: `se cancelo la reserva id ${booking.id}` };
    }

    if (user.role === Role.COWORKING) {
      //!Con esto se asegura que el coworking que tiene la reserva sea el que la cancela

      // if(booking.coworking.user.includes(userId as UUID)){
      //   throw new BadRequestException(`Booking con id ${booking.id} no pertenece al usuario con id ${userId} `)
      // }
      if (
        booking.status === BookingStatus.USER_CANCELED ||
        booking.status === BookingStatus.COWORKING_CANCELED ||
        booking.status === BookingStatus.COMPLETED
      ) {
        throw new BadRequestException(
          `Tu reserva debe ser diferente a cancelada o completa pero su estadio es: ${booking.status}`,
        );
      }

      const employee = await this.employeesRepository.findOneBy({
        id: booking.user.employee.id,
      });

      if (!employee) {
        throw new BadRequestException(
          `No se encontro el empleado con id en la tabla eployee, con id: ${user.employee.id}`,
        );
      }
      await this.employeesRepository.update(employee.id, {
        passesAvailable: employee.passesAvailable + 1,
      });
      booking.status = BookingStatus.COWORKING_CANCELED;
      await this.bookingsRepository.update(booking.id, {
        status: BookingStatus.COWORKING_CANCELED,
      });
      this.nodemailerService.sendCancelBooking(
        booking.coworking.name,
        booking.user.name,
        booking.coworking.name,
        booking.reservationDate,
        booking.reservationTime,
        booking.coworking.address,
        booking.user.email,
      );
      return { mesage: `se cancelo la reserva id ${booking.id}` };
    }

    if (user.role === Role.SUPERADMIN) {
      console.log('El SuperAdmin cancelo');
      if (
        booking.status === BookingStatus.USER_CANCELED ||
        booking.status === BookingStatus.COWORKING_CANCELED ||
        booking.status === BookingStatus.COMPLETED
      ) {
        throw new BadRequestException(
          `Tu reserva debe ser diferente a cancelada o completa pero su estadio es: ${booking.status}`,
        );
      }
      const employee = await this.employeesRepository.findOneBy({
        id: user.employee.id,
      });
      if (!employee) {
        throw new BadRequestException(
          `No se encontro el empleado con id en la tabla eployee, con id: ${user.employee.id}`,
        );
      }
      await this.employeesRepository.update(employee.id, {
        passesAvailable: employee.passesAvailable + 1,
      });
      booking.status = BookingStatus.COWORKING_CANCELED;
      await this.bookingsRepository.update(booking.id, {
        status: BookingStatus.COWORKING_CANCELED,
      });
      this.nodemailerService.sendCancelBooking(
        booking.coworking.name,
        booking.user.name,
        booking.coworking.name,
        booking.reservationDate,
        booking.reservationTime,
        booking.coworking.address,
        booking.user.email,
      );
      return { mesage: `se cancelo la reserva id ${booking.id}` };
    }

    throw new InternalServerErrorException(
      `NO se puedo cancelar reserva porfavor verifica tu rol(${user.role}) o booking`,
    );
  }
}
