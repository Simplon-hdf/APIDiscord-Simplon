import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { SignatureModule } from './signature/signature.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { SignatureService } from './signature/signature.service';
import { UsersService } from './users/users.service';
import { GuildService } from './guild/guild.service';
import { GuildsModule } from './guilds/guilds.module';
import { ConfigModule } from './config/config.module';
import { CoursesModule } from './courses/courses.module';
import { TemplateModule } from './template/template.module';
import { RolesModule } from './roles/roles.module';
import { ChannelsModule } from './channels/channels.module';
import { CategoryModule } from './category/category.module';
import { ChannelsStockModule } from './channels-stock/channels-stock.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SignatureModule,
    UsersModule,
    GuildsModule,
    ConfigModule,
    CoursesModule,
    TemplateModule,
    RolesModule,
    ChannelsModule,
    CategoryModule,
    PromoModule,
    ChannelsStockModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    TasksService,
    SignatureService,
    UsersService,
    GuildService,
  ],
})
export class AppModule {}
