export class CreateChannelDto {
  channel_name: string;
  channel_uuid: string;
  id_guilds: number;

  category_uuid?: string;
}
