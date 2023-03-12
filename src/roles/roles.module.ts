import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaService } from '../prisma.service';
import { CoursesService } from '../courses/courses.service';
import { GuildsService } from '../guilds/guilds.service';
import { UsersService } from '../users/users.service';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';
import { GuildsModule } from '../guilds/guilds.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService],
  imports: [forwardRef(() => CoursesModule), UsersModule, GuildsModule],
  exports: [RolesService],
})
export class RolesModule {}
