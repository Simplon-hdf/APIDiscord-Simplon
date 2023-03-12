import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from '../prisma.service';
import { GuildsService } from '../guilds/guilds.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';
import { GuildsModule } from '../guilds/guilds.module';

@Module({
  controllers: [CoursesController],
  providers: [
    CoursesService,
    PrismaService,
    GuildsService,
    UsersService,
    // RolesService,
  ],
  imports: [forwardRef(() => RolesModule), GuildsModule],
  exports: [CoursesService],
})
export class CoursesModule {}
