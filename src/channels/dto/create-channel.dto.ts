export class CreateChannelDto {
  channel_name: string;
  channel_uuid: string;
  guild_uuid: string;

  category_uuid?: string;
}
