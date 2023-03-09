import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { PrismaService } from '../prisma.service';
import { channels, Prisma } from '@prisma/client';

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

    this.prisma.category
      .findFirst({
        where: {
          category_uuid: createChannelDto.category_uuid,
        },
      })
      .then(async (cat) => {
        response = {
          statusCode: HttpStatus.OK,
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
      });

    return response;
  }
}
