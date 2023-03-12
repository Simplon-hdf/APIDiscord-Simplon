import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('guilds')
@ApiTags('Guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Post('/register')
  createGuild(@Body() createGuildDto: CreateGuildDto) {
    return this.guildsService.createGuilds(createGuildDto);
  }

  @Get()
  getGuilds() {
    return this.guildsService.findAll();
  }

  @Get(':uuid')
  getGuild(@Param('uuid') uuid: string) {
    return this.guildsService.getGuildByUUID(uuid);
  }

  @Delete('delete/:uuid')
  deleteGuild(@Param('uuid') uuid: string) {
    return this.guildsService.deleteGuilds(uuid);
  }
}
