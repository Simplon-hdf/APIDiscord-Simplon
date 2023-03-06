import { Injectable } from '@nestjs/common';
import { CreateChannelsStockDto } from './dto/create-channels-stock.dto';
import { UpdateChannelsStockDto } from './dto/update-channels-stock.dto';

@Injectable()
export class ChannelsStockService {
  create(createChannelsStockDto: CreateChannelsStockDto) {
    return 'This action adds a new channelsStock';
  }

  findAll() {
    return `This action returns all channelsStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channelsStock`;
  }

  update(id: number, updateChannelsStockDto: UpdateChannelsStockDto) {
    return `This action updates a #${id} channelsStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelsStock`;
  }
}
