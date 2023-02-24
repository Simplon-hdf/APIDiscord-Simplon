import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { GuildsModule } from './guilds/guilds.module';

@Module({
  imports: [UsersModule, GuildsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
