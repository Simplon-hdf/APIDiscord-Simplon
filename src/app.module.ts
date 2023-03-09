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

@Module({
  imports: [UsersModule, SignatureModule, ScheduleModule.forRoot()],
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
