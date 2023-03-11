import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto {
  channel_uuid: string;
  channel_name: string;
  guild_uuid: string;
}
