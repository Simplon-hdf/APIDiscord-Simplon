import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('channels')
@ApiTags('Channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post('register')
  async registerChannel(@Body() createChannelDto: CreateChannelDto) {
    return await this.channelsService.registerChannel(createChannelDto);
  }

  @Get('guilds/:uuid')
  async getChannelByGuildUUID(@Param('uuid') uuid: string) {
    return await this.channelsService.getChannelByGuildUUID(uuid);
  }

  @Delete('delete/:uuid')
  async deleteChannel(@Param('uuid') uuid: string) {
    return await this.channelsService.deleteChannel(uuid);
  }

  @Patch('update/name')
  async updateChannelName(@Body() updateChannelDto: UpdateChannelDto) {
    return await this.channelsService.updateChannelName(updateChannelDto);
  }
}
