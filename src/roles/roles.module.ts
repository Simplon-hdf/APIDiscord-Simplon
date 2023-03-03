import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaService } from '../prisma.service';
import { CoursesService } from '../courses/courses.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService, CoursesService],
})
export class RolesModule {}
