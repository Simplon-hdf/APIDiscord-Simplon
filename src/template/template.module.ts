import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { PrismaService } from '../prisma.service';
import { CategoryService } from '../category/category.service';
import { CoursesService } from '../courses/courses.service';
import { ChannelsService } from '../channels/channels.service';
import { GuildsService } from '../guilds/guilds.service';
import { UsersService } from '../users/users.service';
import { CoursesModule } from '../courses/courses.module';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, PrismaService],
  imports: [CoursesModule, ChannelsModule],
  exports: [TemplateService],
})
export class TemplateModule {}
