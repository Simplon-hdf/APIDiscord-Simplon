import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, guilds } from '@prisma/client';
import { CreateGuildDto } from './dto/create-guild.dto';

@Injectable()
export class GuildsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.guildsCreateInput): Promise<guilds> {
    return this.prisma.guilds.create({
      data,
    });
  }

  findAll(): Promise<guilds[]> {
    return this.prisma.guilds.findMany();
  }

  findOne(guildsWhereInput: Prisma.guildsWhereInput): Promise<guilds | null> {
    return this.prisma.guilds.findFirst({
      where: guildsWhereInput,
    });
  }

  update(params: {
    where: Prisma.guildsWhereUniqueInput;
    data: Prisma.guildsUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.guilds.update({
      data,
      where,
    });
  }

  remove(where: Prisma.guildsWhereUniqueInput) {
    return this.prisma.guilds.delete({
      where,
    });
  }

  async createGuilds(createGuildDto: CreateGuildDto) {
    const guilds = await this.findOne({
      guild_uuid: createGuildDto.guild_uuid,
    });

    if (guilds !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Guilds already exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.create({
        ...createGuildDto,
      }),
    };
  }

  async deleteGuilds(uuid: string) {
    const guilds = await this.findOne({
      guild_uuid: uuid,
    });

    if (guilds === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Guilds not exist',
      };
    }

    await this.remove({
      id: guilds.id,
    });

    return {
      statusCode: HttpStatus.OK,
      data: 'Guilds deleted',
    };
  }

  async getGuildByUUID(uuid: string) {
    const guild = await this.findOne({
      guild_uuid: uuid,
    });

    if (guild === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Guild not exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: guild,
    };
  }
}
