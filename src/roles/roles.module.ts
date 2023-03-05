import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaService } from '../prisma.service';
import { CoursesService } from '../courses/courses.service';
import { GuildsService } from '../guilds/guilds.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService, CoursesService, GuildsService],
})
export class RolesModule {}
