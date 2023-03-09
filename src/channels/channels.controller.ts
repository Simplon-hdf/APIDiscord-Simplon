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
import { DeleteChannelDto } from './dto/delete-channel.dto';

@Controller('channels')
@ApiTags('Channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post('register')
  async registerChannel(@Body() createChannelDto: CreateChannelDto) {
    return await this.channelsService.registerChannel(createChannelDto);
  }

  @Delete('delete')
  async deleteChannel(@Body() deleteChannelDto: DeleteChannelDto) {
    return await this.channelsService.deleteChannel(deleteChannelDto);
  }

  @Patch('update/name')
  async updateChannelName(@Body() updateChannelDto: UpdateChannelDto) {
    return await this.channelsService.updateChannelName(updateChannelDto);
  }
}
