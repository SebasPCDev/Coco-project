import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { UUID } from 'crypto';
import { CreateReviewDto } from './createReview.dto';
import { UpdateReviewDto } from './updateReview.dto';

@ApiTags('bookings')
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.reviewsService.findOne(id);
  }

  @Post()
  create(@Req() request, @Body() data: CreateReviewDto) {
    const user = request.user;
    return this.reviewsService.create(user.id, data);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateBookingDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateBookingDto);
  }

}
