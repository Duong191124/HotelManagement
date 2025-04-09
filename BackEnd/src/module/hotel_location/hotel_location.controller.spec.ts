import { Test, TestingModule } from '@nestjs/testing';
import { HotelLocationController } from './hotel_location.controller';
import { HotelLocationService } from './hotel_location.service';

describe('HotelLocationController', () => {
  let controller: HotelLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelLocationController],
      providers: [HotelLocationService],
    }).compile();

    controller = module.get<HotelLocationController>(HotelLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
