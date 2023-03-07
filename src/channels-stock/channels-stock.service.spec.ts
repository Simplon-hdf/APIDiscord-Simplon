import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsStockService } from './channels-stock.service';

describe('ChannelsStockService', () => {
  let service: ChannelsStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelsStockService],
    }).compile();

    service = module.get<ChannelsStockService>(ChannelsStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
