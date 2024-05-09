import { Test, TestingModule } from '@nestjs/testing';
import { AmenitiesController } from './amenities.controller';

describe('AmenitiesController', () => {
  let controller: AmenitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmenitiesController],
    }).compile();

    controller = module.get<AmenitiesController>(AmenitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
