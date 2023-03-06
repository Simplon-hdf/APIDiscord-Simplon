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

  async getChannelsStock(guildUUID: string) {
    const guild = await this.prisma.guilds.findFirst({
      where: {
        guild_uuid: guildUUID,
      },
    });

    if (guild === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Guild is not registered',
      };
    }

    const channelsStock = await this.prisma.channelsStock.findFirst({
      where: {
        id_guilds: guild.id,
      },
    });

    if (channelsStock === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Channels stock is not registered',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: channelsStock,
    };
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
