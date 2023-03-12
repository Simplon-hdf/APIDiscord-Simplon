import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from '../prisma.service';
import { GuildsService } from '../guilds/guilds.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';

@Module({
  controllers: [CoursesController],
  providers: [
    CoursesService,
    PrismaService,
    GuildsService,
    UsersService,
    RolesService,
  ],
})
export class CoursesModule {}
