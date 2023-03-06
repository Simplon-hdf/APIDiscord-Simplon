import { PartialType } from '@nestjs/swagger';
import { CreateChannelsStockDto } from './create-channels-stock.dto';

export class UpdateChannelsStockDto {
  channel_uuid: string;
  guild_uuid: string;
}
