import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Reviews } from 'src/entities/reviews.entity';
import { Users } from 'src/entities/users.entity';
import { FindOptionsOrderValue, FindOptionsWhere, Repository } from 'typeorm';
import { CreateReviewDto } from './createReview.dto';
import { timeToMinutes } from 'src/helpers/timeToMinutes';
import { UpdateReviewDto } from './updateReview.dto';
import { Bookings } from 'src/entities/bookings.entity';
import { BookingStatus } from 'src/models/bookingStatus';

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
      ) { }
      async findAll() {
        const review = await this.reviewsRepository.find()
        return review
      }
    
      async findOne(id: UUID) {
        const review = await this.reviewsRepository.findOne({ where: { id }, relations: ['user', 'coworking'] })
        if (!review) throw new BadRequestException('reseña no encontrada');
        return review;
      }
    
      async create(userId: UUID, data: CreateReviewDto) {
    
        const user = await this.usersRepository.findOneBy({ id: userId })
        if (!user) throw new BadRequestException('Usuario no encontrado');
    
        const coworking = await this.coworkingsRepository.findOneBy({ id: data.coworking_id })
        if (!coworking) throw new BadRequestException('Coworking no encontrado');

        //! completada la reserva (estado complete)
        const booking = await this.bookingsRepository.find({
            where: { 
                user: user,
                coworking: coworking,
                status:BookingStatus.COMPLETED
             }, 
            relations: ['user', 'coworking'],
          
        })
        if(booking.length===0){
            throw new BadRequestException('Debe tener almenos una reserva en completed poder hacer una reseña');
        }
    
        const newData = { ...data, user, coworking }
    
        const newReview = this.reviewsRepository.create(newData)
        const review = await this.reviewsRepository.save(newReview)
    
        return review;
      }
    
    
      async update(id: UUID, changes: UpdateReviewDto) {
        const review = await this.findOne(id);
        //!  Respuesta solo coworking   
        if(!changes.res_coworking){
            throw new BadRequestException("Debe tener respuesta de coworking para poder actualizar el coworking")
        }
        const updReview = this.reviewsRepository.merge(review, changes);
        return await this.reviewsRepository.save(updReview);
      }

      //! servico que muestre 5 comentarios por id  coworking  ultimos 5  where con order  // filtrado por estrellas
      async getFirstFiveReviews(
        page: number,
        limit: number,
      ) {
        const where: FindOptionsWhere<Reviews> = {};
    
    
        const skip = (page - 1) * limit;
    
        const conditions = {
          skip: skip,
          take: limit,
          where,
          order: { date: 'DESC' as FindOptionsOrderValue },
        };
        const [reviews, total] =
          await this.reviewsRepository.findAndCount(conditions);
    
        return { page, limit, total, reviews };
      }

      //! servicio promedio  de estrellas por id de coworking 

      async calcularPromedioEstrellasPorCoworking(coworkingId: string): Promise<number> {
        const coworking = await this.coworkingsRepository.findOneBy({ id: coworkingId })
        if (!coworking) throw new BadRequestException('Coworking no encontrado');
        const reviews = await this.reviewsRepository.find({ where: { coworking: coworking } });
    
        if (reviews.length > 0) {
          const totalEstrellas = reviews.reduce((acumulador, review) => acumulador + review.coworking_rating, 0);
          return totalEstrellas / reviews.length;
        } else {
          return 0;
        }
      }

}
