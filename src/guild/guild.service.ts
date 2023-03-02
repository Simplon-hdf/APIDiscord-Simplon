import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { guilds, Prisma } from '@prisma/client';

@Injectable()
export class GuildService {
  constructor(private prisma: PrismaService, private users: UsersService) {}

  findOne(id: string): Promise<guilds> {
    return this.prisma.guilds.findFirst({ where: { guild_uuid: id } });
  }
  getGuildIdByGuildUuid(
    guildsWhereUniqueInput: Prisma.guildsWhereUniqueInput,
  ): any {
    return this.prisma.guilds.findFirst({ where: guildsWhereUniqueInput });
  }
}
