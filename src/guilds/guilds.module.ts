import { Module } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { GuildsController } from './guilds.controller';
import { PrismaService } from '../prisma.service';
import { TemplateService } from '../template/template.service';
import { CategoryService } from '../category/category.service';
import { CoursesService } from '../courses/courses.service';
import { ChannelsService } from '../channels/channels.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';

@Module({
  controllers: [GuildsController],
  providers: [GuildsService, PrismaService],
  exports: [GuildsService],
})
export class GuildsModule {}
