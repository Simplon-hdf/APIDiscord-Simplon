import { Module } from '@nestjs/common';
import { ChannelsStockService } from './channels-stock.service';
import { ChannelsStockController } from './channels-stock.controller';
import { PrismaService } from '../prisma.service';
import { CategoryService } from '../category/category.service';

@Module({
  controllers: [ChannelsStockController],
  providers: [ChannelsStockService, PrismaService, CategoryService],
})
export class ChannelsStockModule {}
