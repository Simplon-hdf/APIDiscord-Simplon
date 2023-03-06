import { Module } from '@nestjs/common';
import { ChannelsStockService } from './channels-stock.service';
import { ChannelsStockController } from './channels-stock.controller';
import { PrismaService } from '../prisma.service';
import { CategoryService } from '../category/category.service';
import { ChannelsService } from '../channels/channels.service';

@Module({
  controllers: [ChannelsStockController],
  providers: [
    ChannelsStockService,
    PrismaService,
    CategoryService,
    ChannelsService,
  ],
})
export class ChannelsStockModule {}
