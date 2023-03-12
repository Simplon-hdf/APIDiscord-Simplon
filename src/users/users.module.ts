import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { GuildsService } from '../guilds/guilds.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, GuildsService],
  exports: [UsersService],
})
export class UsersModule {}
