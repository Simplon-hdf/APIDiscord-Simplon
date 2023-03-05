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
  registerChannel(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.registerChannel(createChannelDto);
  }
}
