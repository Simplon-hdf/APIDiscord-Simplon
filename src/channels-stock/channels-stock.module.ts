import { Module } from '@nestjs/common';
import { ChannelsStockService } from './channels-stock.service';
import { ChannelsStockController } from './channels-stock.controller';

@Module({
  controllers: [ChannelsStockController],
  providers: [ChannelsStockService]
})
export class ChannelsStockModule {}
