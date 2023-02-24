import { Module } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { GuildsController } from './guilds.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [GuildsController],
  providers: [GuildsService, PrismaService],
})
export class GuildsModule {}
