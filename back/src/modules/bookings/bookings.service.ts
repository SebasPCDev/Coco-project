import { BadRequestException, Injectable } from '@nestjs/common';

import { UUID } from 'crypto';
import { CreateBookingsDto, UpdateBookingsDto } from './bookings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Bookings } from 'src/entities/bookings.entity';
import { timeToMinutes } from 'src/helpers/timeToMinutes';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Coworkings)
    private coworkingsRepository: Repository<Coworkings>,
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
  ) { }

  async findAll() {
    const bookings = await this.bookingsRepository.find()
    return bookings
  }

  async findOne(id: UUID) {
    const booking = await this.bookingsRepository.findOne({ where: { id }, relations: ['user', 'coworking'] })
    if (!booking) throw new BadRequestException('Booking not found');
    return booking;
  }

  async create(userId: UUID, data: CreateBookingsDto) {

    const user = await this.usersRepository.findOneBy({ id: userId })
    if (!user) throw new BadRequestException('User not found');

    const coworking = await this.coworkingsRepository.findOneBy({ id: data.coworkingId })
    if (!coworking) throw new BadRequestException('Coworking not found');

    const openTimeMinutes = timeToMinutes(coworking.open);
    const closeTimeMinutes = timeToMinutes(coworking.close);
    const reservationTimeMinutes = timeToMinutes(data.reservationTime);

    // Comparar las horas en minutos
    if (reservationTimeMinutes < openTimeMinutes || reservationTimeMinutes > closeTimeMinutes) {
      throw new BadRequestException('The reservation time is before the opening or after the closing of the coworking');
    }


    const newData = { ...data, user, coworking }

    const newBooking = this.bookingsRepository.create(newData)
    const booking = await this.bookingsRepository.save(newBooking)

    return booking;
  }


  async update(id: UUID, changes: UpdateBookingsDto) {
    const booking = await this.findOne(id);

    const updBooking = this.bookingsRepository.merge(booking, changes);
    return await this.bookingsRepository.save(updBooking);
  }


}
