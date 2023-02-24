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
    const guilds = this.findOne({
      guild_uuid: createGuildDto.guild_uuid,
    });

    if (guilds) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Guilds already exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: this.create({
        ...createGuildDto,
      }),
    };
  }

  async getGuildByUUID(uuid: number) {
    const guild = this.findOne({
      guild_uuid: uuid,
    });

    if (!guild) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Guild not exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: guild,
    };
  }
}
