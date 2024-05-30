import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
// FindOptionsWhere,
import {
  DataSource,
  FindOptionsOrderValue,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { NodemailerService } from '../nodemailer/nodemailer.service';
//import { loadDataCoworkings } from 'src/utils/loadData';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Users } from 'src/entities/users.entity';
import { Request } from 'src/entities/requests.entity';
import { CreateCoworkingsDto, UpdateCoworkingsDto } from './coworkings.dto';
import { CreateUsersDto, UpdateUsersDto } from '../users/users.dto';
import { Role } from 'src/models/roles.enum';
import { UserStatus } from 'src/models/userStatus.enum';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { CoworkingImages } from 'src/entities/coworkingImages.entity';
import { CreateUserCoworkingsDto } from '../users/coworkings.dto';
import { UpdateBookingsDto } from '../bookings/bookings.dto';
import { BookingsService } from '../bookings/bookings.service';
import { BookingStatus } from 'src/models/bookingStatus';
import { Amenities } from 'src/entities/amenities.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CoworkingsService {
  constructor(
    @InjectRepository(Coworkings)
    private coworkingsRepository: Repository<Coworkings>,
    private dataSource: DataSource,
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(CoworkingImages)
    private coworkingImagesRepository: Repository<CoworkingImages>,
    @InjectRepository(Amenities)
    private amenitiesRepository: Repository<Amenities>,
    private readonly bookingsService: BookingsService,
    private readonly nodemailerService: NodemailerService,
    private readonly jwtService: JwtService,
  ) { }

  async getAllCoworkings(
    page: number,
    limit: number,
    country?: string,
    state?: string,
    city?: string,
    name?: string,
    status?: CoworkingStatus,
  ) {
    const where: FindOptionsWhere<Coworkings> = {};
    if (country) where.country = country;
    if (state) where.state = state;
    if (city) where.city = city;
    if (name) where.name = name;
    if (status) where.status = status;

    const skip = (page - 1) * limit;

    const conditions = {
      skip: skip,
      take: limit,
      where,
      order: { updatedAt: 'DESC' as FindOptionsOrderValue },
    };
    const [coworking, total] =
      await this.coworkingsRepository.findAndCount(conditions);
    return { page, limit, total, coworking };
  }

  async getCoworkings() {
    return await this.coworkingsRepository.find();
  }

  async getBookingsByCoworking(id: UUID) {
    const coworking = await this.coworkingsRepository.findOne({
      relations: ['bookings', 'bookings.user'],
      where: { id },
    });

    if (!coworking) {
      throw new NotFoundException(`Coworking con id ${id} no encontrado`);
    }

    return coworking;
  }

  async getCoworkingById(id: UUID) {
    const coworking = await this.coworkingsRepository.findOne({
      relations: ['user', 'images', 'amenities'],
      where: { id },
    });

    if (!coworking) {
      throw new NotFoundException(`Coworking con id ${id} no encontrado`);
    }

    return coworking;
  }

  async getCountries() {
    const countries = await this.coworkingsRepository
      .createQueryBuilder('coworking')
      .distinct(true)
      .select('country')
      .where('coworking.status = :status')
      .setParameter('status', CoworkingStatus.ACTIVE)
      .execute();

    const countriesArr = countries.map(
      (coworking: Coworkings) => coworking.country,
    );
    return countriesArr;
  }

  async getStates(country: string) {
    const states = await this.coworkingsRepository
      .createQueryBuilder('coworking')
      .distinct(true)
      .select('state')
      .where('coworking.status = :status')
      .where('coworking.country = :country')
      .setParameter('status', CoworkingStatus.ACTIVE)
      .setParameter('country', country)
      .execute();

    const statesArr = states.map((coworking: Coworkings) => coworking.state);
    return statesArr;
  }

  async getCities(country: string, state: string) {
    const cities = await this.coworkingsRepository
      .createQueryBuilder('coworking')
      .distinct(true)
      .select('city')
      .where('coworking.status = :status')
      .where('coworking.country = :country')
      .where('coworking.state = :state')
      .setParameter('status', CoworkingStatus.ACTIVE)
      .setParameter('country', country)
      .setParameter('state', state)
      .execute();

    const citiesArr = cities.map((coworking: Coworkings) => coworking.city);
    return citiesArr;
  }

  async create(userId: UUID, data: CreateCoworkingsDto) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    data.user = [user];
    const newUser = this.coworkingsRepository.create(data);
    return await this.coworkingsRepository.save(newUser);
  }

  async activateCoworking(id: UUID, email = true) {
    // 1- Busco la solicitud
    const requestCoworking = await this.requestsRepository.findOneBy({ id });
    if (!requestCoworking || requestCoworking.status === StatusRequest.CLOSE)
      throw new BadRequestException('Solicitud procesada o inexistente');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction(); // START
      // 2- Crear user
      // const password = Math.random().toString(36).slice(-8);
      const password = process.env.SUPERADMIN_PASSWORD;
      const hashedPass = await bcrypt.hash(password, 10);
      if (!hashedPass) throw new BadRequestException('Contraseña no haseada');

      const userData: CreateUsersDto = {
        name: requestCoworking.name,
        lastname: requestCoworking.lastname,
        phone: requestCoworking.phone,
        email: requestCoworking.email,
        password: hashedPass,
        identification: requestCoworking.identification,
        position: requestCoworking.position,
        status: UserStatus.ACTIVE,
        role: Role.ADMIN_COWORKING,
      };

      const user = await this.usersRepository.findOneBy({
        email: requestCoworking.email,
      });

      if (user) throw new BadRequestException('Usuario existente');

      const newUserTemp = this.usersRepository.create(userData);
      const newUser = await queryRunner.manager.save(newUserTemp);

      // 2- Crear coworking -> users_coworking
      const coworking: CreateCoworkingsDto = {
        name: requestCoworking.companyName,
        email: requestCoworking.companyEmail,
        phone: requestCoworking.companyPhone,
        address: requestCoworking.address,
        open: requestCoworking.open,
        close: requestCoworking.close,
        capacity: requestCoworking.capacity,
        message: requestCoworking.message,
        status: CoworkingStatus.PENDING,
        user: [newUser],
      };

      const newCoworkingTemp = this.coworkingsRepository.create(coworking);
      const newCoworking = await queryRunner.manager.save(newCoworkingTemp);

      // 3- Requests pending -> close
      const updRequest = this.requestsRepository.merge(requestCoworking, {
        status: StatusRequest.CLOSE,
      });
      await queryRunner.manager.save(updRequest);

      // 4- Enviar email
      if (email)
        this.nodemailerService.confirmacionMailRequest(
          requestCoworking.email,
          requestCoworking.companyName,
          password,
        );

      await queryRunner.commitTransaction(); //COMMIT
      await queryRunner.release(); // RELEASE

      return newCoworking;
    } catch (err) {
      await queryRunner.rollbackTransaction(); // ROLLBACK
      await queryRunner.release(); // RELEASE
      throw err;
    }
  }

  async createUserCoworking(data: CreateUserCoworkingsDto, email = true) {
    const dbUser = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (dbUser) throw new BadRequestException('El recepcionista ya existe');

    const coworking = await this.coworkingsRepository.findOneBy({
      id: data.coworkingId,
    });
    if (!coworking) throw new BadRequestException('Coworking no encontrado');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction(); // START

      data.role = Role.COWORKING;
      data.status = UserStatus.ACTIVE;

      // const password = Math.random().toString(36).slice(-8);
      const password = process.env.SUPERADMIN_PASSWORD;
      const hashedPass = await bcrypt.hash(password, 10);
      if (!hashedPass)
        throw new BadRequestException('Contraseña no pudo ser haseada');

      data.password = hashedPass;

      const user = this.usersRepository.create(data);
      user.coworkings = [coworking];
      const newUser = await queryRunner.manager.save(user);

      await queryRunner.commitTransaction(); //COMMIT

      await queryRunner.release(); // RELEASE
      //!Email a al usuario newUser password
      if (email)
        this.nodemailerService.sendActivationMailCoworkEmployee(
          newUser.name,
          newUser.email,
          password,
        );

      return newUser;
    } catch (err) {
      await queryRunner.rollbackTransaction(); // ROLLBACK
      await queryRunner.release(); // RELEASE
      throw err;
    }
  }

  async updateReceptionist(
    adminCoworking: Users,
    coworkingId: UUID,
    userId: UUID,
    changes: UpdateUsersDto,
  ) {
    const coworking = await this.getCoworkingById(coworkingId);

    const foundAdminCoworking = coworking.user.findIndex(
      (employee) =>
        employee.id === adminCoworking.id &&
        employee.role === Role.ADMIN_COWORKING,
    );
    if (foundAdminCoworking === -1)
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta',
      );

    const foundRecepcionist = coworking.user.findIndex(
      (employee) => employee.id === userId && employee.role === Role.COWORKING,
    );
    if (foundRecepcionist === -1)
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta',
      );

    const dbUser = await this.usersRepository.findOneBy({ id: userId });
    if (!dbUser) throw new ForbiddenException('Recepcionista no encontrado');

    const updUser = this.usersRepository.merge(dbUser, changes);
    return await this.usersRepository.save(updUser);
  }

  async updateBooking(
    coworkingId: UUID,
    bookingId: UUID,
    changes: UpdateBookingsDto,
  ) {
    console.log(coworkingId, bookingId, changes);
    const booking = await this.bookingsService.findOne(bookingId);

    if (booking.status !== BookingStatus.PENDING)
      throw new BadRequestException(
        'El estado de la reserva no se puede modificar',
      );

    if (
      changes.status !== BookingStatus.ACTIVE &&
      changes.status !== BookingStatus.COWORKING_CANCELED
    ) {
      throw new BadRequestException(
        'El estado de la reserva no se puede modificar',
      );
    }

    if (changes.status === BookingStatus.ACTIVE) {
      changes.confirmPhrase = Math.random().toString(36).slice(-8);
      // !Mail a user con phrase ()
      //!mail a coworking y a empleado  que  se actulizo la reserva
      //* Envia a empleado


      const payload = {
        id: booking.user.id,
        confirmPhrase: changes.confirmPhrase,
        bookingId,
        coworkingId,
        reservationDate: booking.reservationDate,
      };

      const currentDateMillis = Date.now();
      const reserveDate = new Date('2024-06-12T00:00:00.000Z');
      const reserveDateMillis = reserveDate.getTime();
      const differenceMillis = reserveDateMillis - currentDateMillis;

      const token = this.jwtService.sign(payload, {
        expiresIn: differenceMillis,
      });

      const link = `${process.env.NODEMAILER_FRONT_URL}/check-in?token=${token}`;

      this.nodemailerService.sendBookingActiveNotificationEmployee(
        booking.coworking.name,
        booking.user.name,
        booking.reservationDate,
        booking.reservationTime,
        booking.coworking.address,
        changes.confirmPhrase,
        booking.user.email,
        link,
      );
      //*Envia a coworking
      this.nodemailerService.sendBookingActiveNotificationCoworking(
        booking.coworking.name,
        booking.user.name,
        booking.reservationDate,
        booking.reservationTime,
        booking.coworking.address,
        booking.coworking.email,
      );

      console.log('EMAIL', changes.confirmPhrase);
    } else {
      //! Mail a user rechazo
      //* Envia a user
      this.nodemailerService.sendBookingRejectNotificationEmployee(
        booking.coworking.name,
        booking.user.name,
        booking.reservationDate,
        booking.reservationTime,
        booking.coworking.address,
        booking.user.email,
      );
      //*Envia a coworking
      this.nodemailerService.sendBookingRejectNotificationCoworking(
        booking.coworking.name,
        booking.user.name,
        booking.reservationDate,
        booking.reservationTime,
        booking.coworking.address,
        booking.coworking.email,
      );
      console.log('EMIAL de RECHAZO');
    }

    const updBooking = await this.bookingsService.update(bookingId, changes);
    return updBooking;
  }

  async checkIn(bookingId: UUID) {
    const booking = await this.bookingsService.findOne(bookingId);

    if (booking.status !== BookingStatus.ACTIVE)
      throw new BadRequestException(
        `El estado de la reserva no se puede modificar, estado en : ${booking.status}`,
      );

    booking.confirmCoworking = true;
    if (booking.confirmUser === true) {
      //* Pasa el estado a complete

      // //!Descuenta los pases una vez  completo
      // if(booking.user.employee.passesAvailable<=0){
      //   throw new BadRequestException("El cliente no tiene pases disponibles")
      // }
      // booking.user.employee.passesAvailable  =  booking.user.employee.passesAvailable-1
      // //! Envio de email con saldo de pases disponibles
      booking.status = BookingStatus.COMPLETED;
    }
    const updBooking = await this.bookingsService.update(bookingId, booking);
    return updBooking;

    // verificar si booking "ACTIVO"
    // coworking_confirm = true
    // Verifica si user_confirm = true => pasa estado a Completed
  }

  async update(id: UUID, changes: UpdateCoworkingsDto) {
    const coworking = await this.getCoworkingById(id);

    if (changes.status) {
      const geography =
        coworking.country &&
        coworking.state &&
        coworking.city; /* && coworking.lat && coworking.long */

      if (
        (changes.status === CoworkingStatus.ACTIVE && !geography) ||
        !coworking.thumbnail
      )
        throw new BadRequestException(
          'Se requieren los datos de país, estado, ciudad, latitud, longitud y miniatura para activar el coworking.',
        );
    }

    if (changes.amenitiesIds) {
      const amenities = await this.amenitiesRepository.find({
        where: { id: In(changes.amenitiesIds) },
      });
      coworking.amenities = amenities;
    }

    const updCoworking = this.coworkingsRepository.merge(coworking, changes);
    return await this.coworkingsRepository.save(updCoworking);
  }

  async addImage(id: UUID, secure_url: string) {
    const coworking = await this.getCoworkingById(id);

    const image = this.coworkingImagesRepository.create({ secure_url });

    image.coworking = coworking;

    await this.coworkingImagesRepository.save(image);

    return await this.getCoworkingById(id);
  }
}
