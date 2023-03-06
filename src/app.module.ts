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
import { ChannelsModule } from './channels/channels.module';
import { CategoryModule } from './category/category.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [
    UsersModule,
    GuildsModule,
    ConfigModule,
    CoursesModule,
    TemplateModule,
    RolesModule,
    ChannelsModule,
    CategoryModule,
    PromoModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
