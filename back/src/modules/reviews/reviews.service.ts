import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Reviews } from 'src/entities/reviews.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './createReview.dto';
import { timeToMinutes } from 'src/helpers/timeToMinutes';
import { UpdateReviewDto } from './updateReview.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Coworkings)
        private coworkingsRepository: Repository<Coworkings>,
        @InjectRepository(Reviews)
        private reviewsRepository: Repository<Reviews>,
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
    
        const newData = { ...data, user, coworking }
    
        const newReview = this.reviewsRepository.create(newData)
        const review = await this.reviewsRepository.save(newReview)
    
        return review;
      }
    
    
      async update(id: UUID, changes: UpdateReviewDto) {
        const review = await this.findOne(id);
    
        const updReview = this.reviewsRepository.merge(review, changes);
        return await this.reviewsRepository.save(updReview);
      }
}
