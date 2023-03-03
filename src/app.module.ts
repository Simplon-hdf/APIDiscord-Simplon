import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { GuildsModule } from './guilds/guilds.module';
import { ConfigModule } from './config/config.module';
import { CoursesModule } from './courses/courses.module';
import { TemplateModule } from './template/template.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, GuildsModule, ConfigModule, CoursesModule, TemplateModule, RolesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
