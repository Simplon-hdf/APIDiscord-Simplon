import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelsStockDto } from './dto/create-channels-stock.dto';
import { UpdateChannelsStockDto } from './dto/update-channels-stock.dto';
import { PrismaService } from '../prisma.service';
import { channelsStock, Prisma } from '@prisma/client';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ChannelsStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly category: CategoryService,
  ) {}

  create(data: Prisma.channelsStockCreateInput): Promise<channelsStock> {
    return this.prisma.channelsStock.create({ data });
  }

  findOne(
    channelsStockWhereInput: Prisma.channelsStockWhereInput,
  ): Promise<channelsStock> {
    return this.prisma.channelsStock.findFirst({
      where: channelsStockWhereInput,
    });
  }

  async addChannelToStock(guildUUID: string, channelUUID: string) {
    const channelsStock = await this.getChannelsStockByGuildUUID(guildUUID);

    if (typeof channelsStock === 'string') {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: channelsStock,
      };
    }

    const channel = await this.prisma.channels.findFirst({
      where: {
        channel_uuid: channelUUID,
      },
    });

    if (channel === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Channel is not registered',
      };
    }

    const channelInStock = await this.prisma.define.findFirst({
      where: {
        id: channel.id,
        id_channelsStock: channelsStock.id,
      },
    });

    if (channelInStock !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Channel is already in stock',
      };
    }

    await this.prisma.define.create({
      data: {
        id: channel.id,
        id_channelsStock: channelsStock.id,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      data: 'Channel added to stock',
    };
  }

  async getChannelsStockByGuildUUID(
    guildUUID: string,
  ): Promise<channelsStock | string> {
    const guild = await this.prisma.guilds.findFirst({
      where: {
        guild_uuid: guildUUID,
      },
    });

    if (!guild) {
      return 'Guild is not registered';
    }

    const channelsStock = await this.prisma.channelsStock.findFirst({
      where: {
        id_guilds: guild.id,
      },
    });

    if (!channelsStock) {
      return 'Channels stock is not registered';
    }

    return channelsStock;
  }

  async registerChannelsStock(categoryUUID) {
    const category = await this.category.category({
      category_uuid: categoryUUID,
    });

    if (category === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Category is not registered',
      };
    }

    const stockChannels = await this.findOne({
      id_guilds: category.id_guilds,
    });

    if (stockChannels !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Channels stock is already registered',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.create({
        guilds: {
          connect: {
            id: category.id_guilds,
          },
        },
        category: {
          connect: {
            id: category.id,
          },
        },
      }),
    };
  }
}
