import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { PrismaService } from '../prisma.service';
import { channels, Prisma } from '@prisma/client';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.channelsCreateInput): Promise<channels> {
    return this.prisma.channels.create({
      data,
    });
  }

  findOne(channelWhereInput: Prisma.channelsWhereInput): Promise<channels> {
    return this.prisma.channels.findFirst({
      where: channelWhereInput,
    });
  }

  findMany(channelWhereInput: Prisma.channelsWhereInput): Promise<channels[]> {
    return this.prisma.channels.findMany({
      where: channelWhereInput,
    });
  }

  async getChannelByUUID(uuid: string) {
    return await this.findOne({
      channel_uuid: uuid,
    });
  }

  async getChannelByGuildUUID(uuid: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.findMany({
        guilds: {
          guild_uuid: uuid,
        },
      }),
    };
  }

  async registerChannel(createChannelDto: CreateChannelDto) {
    const channel = await this.findOne({
      channel_uuid: createChannelDto.channel_uuid,
    });

    if (channel) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Channel already exist',
      };
    }

    let response;

    if (createChannelDto.category_uuid === undefined) {
      return {
        statusCode: HttpStatus.OK,
        data: await this.create({
          channel_uuid: createChannelDto.channel_uuid,
          channel_name: createChannelDto.channel_name,
          guilds: {
            connect: {
              id: createChannelDto.id_guilds,
            },
          },
        }),
      };
    }

    const cat = await this.prisma.category.findFirst({
      where: {
        category_uuid: createChannelDto.category_uuid,
      },
    });

    if (!cat) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Category not found',
      };
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: await this.create({
        channel_uuid: createChannelDto.channel_uuid,
        channel_name: createChannelDto.channel_name,
        guilds: {
          connect: {
            id: createChannelDto.id_guilds,
          },
        },
        category: {
          connect: {
            id: cat.id,
          },
        },
      }),
    };
  }

  async updateChannelName(updateChannelDto: UpdateChannelDto) {
    const channel = await this.findOne({
      channel_uuid: updateChannelDto.channel_uuid,
      guilds: {
        guild_uuid: updateChannelDto.guild_uuid,
      },
    });

    if (!channel) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Channel not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.prisma.channels.update({
        where: {
          id: channel.id,
        },
        data: {
          channel_name: updateChannelDto.channel_name,
        },
      }),
    };
  }

  async deleteChannel(uuid: string) {
    const channel = await this.findOne({
      channel_uuid: uuid,
    });

    if (!channel) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Channel not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.prisma.channels.delete({
        where: {
          id: channel.id,
        },
      }),
    };
  }
}
