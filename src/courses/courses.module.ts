import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from '../prisma.service';
import { GuildsService } from '../guilds/guilds.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService, GuildsService],
})
export class CoursesModule {}
