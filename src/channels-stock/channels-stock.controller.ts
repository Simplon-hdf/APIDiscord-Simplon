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

@Controller('channels-stock')
export class ChannelsStockController {
  constructor(private readonly channelsStockService: ChannelsStockService) {}

  @Post('register/:categoryUUID')
  registerChannelsStock(@Param('categoryUUID') categoryUUID: string) {
    return this.channelsStockService.registerChannelsStock(categoryUUID);
  }

  @Get(':guildUUID')
  async getChannelsStock(@Param('guildUUID') guildUUID: string) {
    const channelsStock =
      await this.channelsStockService.getChannelsStockByGuildUUID(guildUUID);

    if (typeof channelsStock === 'string') {
      return {
        statusCode: 409,
        error: channelsStock,
      };
    }

    return {
      statusCode: 200,
      data: channelsStock,
    };
  }
}
