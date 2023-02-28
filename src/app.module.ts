import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { GuildsModule } from './guilds/guilds.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UsersModule, GuildsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
