import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsStockController } from './channels-stock.controller';
import { ChannelsStockService } from './channels-stock.service';

describe('ChannelsStockController', () => {
  let controller: ChannelsStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelsStockController],
      providers: [ChannelsStockService],
    }).compile();

    controller = module.get<ChannelsStockController>(ChannelsStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
