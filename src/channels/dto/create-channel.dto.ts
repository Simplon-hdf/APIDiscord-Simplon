export class CreateChannelDto {
  channel_name: string;
  channel_uuid: string;
  id_guilds: number;

  id_category?: number;
}
