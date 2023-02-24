import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { TicketingModule } from './ticketing/ticketing.module';

@Module({
  imports: [UsersModule, TicketingModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
