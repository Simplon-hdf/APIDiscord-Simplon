import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelsStockService } from './channels-stock.service';
import { CreateChannelsStockDto } from './dto/create-channels-stock.dto';
import { UpdateChannelsStockDto } from './dto/update-channels-stock.dto';

@Controller('channels-stock')
export class ChannelsStockController {
  constructor(private readonly channelsStockService: ChannelsStockService) {}

  @Post('register')
  registerChannelsStock(@Body() categoryUUID: string) {
    return this.channelsStockService.registerChannelsStock(categoryUUID);
  }
}
