import { PartialType } from '@nestjs/swagger';
import { CreateChannelsStockDto } from './create-channels-stock.dto';

export class UpdateChannelsStockDto extends PartialType(CreateChannelsStockDto) {}
