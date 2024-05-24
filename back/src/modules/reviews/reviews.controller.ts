import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { UUID } from 'crypto';
import { CreateReviewDto } from './createReview.dto';
import { UpdateReviewDto } from './updateReview.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('reviews')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }
    

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }
  
  @Get('firstfive/:id')
  getFirstFiveReviews(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Param('id', ParseUUIDPipe)id: UUID,
  ) {
    return this.reviewsService.getFirstFiveReviews( id,page, limit);
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
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateBookingDto: UpdateReviewDto,@Req() request) {
    const user = request.user;
    return this.reviewsService.update(id, updateBookingDto,user.id);
  }

  

  @Get('average/stars/:id')
  averageStars( @Param('id', ParseUUIDPipe) coworkingId: UUID){
    return this.reviewsService.calcularPromedioEstrellasPorCoworking(coworkingId)
  }


}
