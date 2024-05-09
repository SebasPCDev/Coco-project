import { Test, TestingModule } from '@nestjs/testing';
import { AmenitiesService } from './amenities.service';

describe('AmenitiesService', () => {
  let service: AmenitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmenitiesService],
    }).compile();

    service = module.get<AmenitiesService>(AmenitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
