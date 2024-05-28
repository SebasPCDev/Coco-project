import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Reviews } from 'src/entities/reviews.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './createReview.dto';
import { UpdateReviewDto } from './updateReview.dto';
import { Bookings } from 'src/entities/bookings.entity';
import { BookingStatus } from 'src/models/bookingStatus';
import { Role } from 'src/models/roles.enum';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Coworkings)
    private coworkingsRepository: Repository<Coworkings>,
    @InjectRepository(Reviews)
    private reviewsRepository: Repository<Reviews>,
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
  ) {}

  //*Retorna todos las reviews
  async findAll() {
    const review = await this.reviewsRepository.find();
    return review;
  }

  async findOne(id: UUID) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'coworking'],
    });
    if (!review) throw new BadRequestException('reseña no encontrada');
    return review;
  }

  async create(userId: UUID, data: CreateReviewDto) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const coworking = await this.coworkingsRepository.findOneBy({
      id: data.coworking_id,
    });
    if (!coworking) throw new BadRequestException('Coworking no encontrado');

    //! completada la reserva (estado complete)
    const booking = await this.bookingsRepository.find({
      where: {
        user: { id: userId },
        coworking: { id: coworking.id },
        status: BookingStatus.COMPLETED,
      },
      relations: ['user', 'coworking'],
    });
    if (user.role !== Role.EMPLOYEE) {
      throw new BadRequestException(
        `No tienes peritido hacer reviews siendo ${user.role}`,
      );
    }
    if (booking.length === 0) {
      throw new BadRequestException(
        'Debe tener almenos una reserva en completed para poder hacer una reseña',
      );
    }

    const newData = { ...data, user, coworking };

    const newReview = this.reviewsRepository.create(newData);
    const review = await this.reviewsRepository.save(newReview);

    return review;
  }

  async update(id: UUID, changes: UpdateReviewDto, userId: UUID) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('Usuario no encontrado');
    const review = await this.findOne(id);
    //!  Respuesta solo coworking
    if (!changes.res_coworking) {
      throw new BadRequestException(
        'Debe tener respuesta de coworking(no debe estar nullo)para poder actualizar el coworking',
      );
    }

    if (!!changes.coworking_rating || !!changes.comment) {
      throw new BadRequestException(
        'Debe estar los campos coworking_rating y comment vacios o nulos',
      );
    }

    if (user.role === Role.SUPERADMIN) {
      const updReview = this.reviewsRepository.merge(review, changes);
      return await this.reviewsRepository.save(updReview);
    }

    if (user.role === Role.ADMIN_COWORKING) {
      const updReview = this.reviewsRepository.merge(review, changes);
      return await this.reviewsRepository.save(updReview);
    }

    if (user.role === Role.COWORKING) {
      const updReview = this.reviewsRepository.merge(review, changes);
      return await this.reviewsRepository.save(updReview);
    } else {
      throw new BadRequestException(
        `los usuarios ${user.role} no tienen permitido hacer cambios`,
      );
    }
  }

  //?servico que muestre 5 comentarios por id  coworking  ultimos 5  where con order  // filtrado por estrellas
  async getFirstFiveReviews(
    coworkingId: string,
    page: number = 1,
    limit: number = 5,
  ): Promise<Reviews[]> {
    const offset = (page - 1) * limit;

    const reviews = await this.reviewsRepository.find({
      where: { coworking: { id: coworkingId } },
      order: { date: 'DESC' },
      take: limit,
      skip: offset,
    });

    return reviews;
  }

  //? servicio promedio  de estrellas por id de coworking

  async calcularPromedioEstrellasPorCoworking(
    coworkingId: string,
  ): Promise<number> {
    const coworking = await this.coworkingsRepository.findOneBy({
      id: coworkingId,
    });
    if (!coworking) throw new BadRequestException('Coworking no encontrado');
    const reviews = await this.reviewsRepository.find({
      where: { coworking: { id: coworking.id } },
    });

    if (reviews.length > 0) {
      const totalEstrellas = reviews.reduce(
        (acumulador, review) => acumulador + review.coworking_rating,
        0,
      );
      return totalEstrellas / reviews.length;
    } else {
      return 0;
    }
  }
}
