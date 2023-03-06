import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelsStockService } from './channels-stock.service';
import { CreateChannelsStockDto } from './dto/create-channels-stock.dto';
import { UpdateChannelsStockDto } from './dto/update-channels-stock.dto';

@Controller('channels-stock')
export class ChannelsStockController {
  constructor(private readonly channelsStockService: ChannelsStockService) {}

  @Post()
  create(@Body() createChannelsStockDto: CreateChannelsStockDto) {
    return this.channelsStockService.create(createChannelsStockDto);
  }

  @Get()
  findAll() {
    return this.channelsStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelsStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelsStockDto: UpdateChannelsStockDto) {
    return this.channelsStockService.update(+id, updateChannelsStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelsStockService.remove(+id);
  }
}
