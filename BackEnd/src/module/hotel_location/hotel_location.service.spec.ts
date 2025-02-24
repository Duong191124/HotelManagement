import { Test, TestingModule } from '@nestjs/testing';
import { HotelLocationService } from './hotel_location.service';

describe('HotelLocationService', () => {
  let service: HotelLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelLocationService],
    }).compile();

    service = module.get<HotelLocationService>(HotelLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
