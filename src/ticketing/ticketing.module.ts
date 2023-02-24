import { Module } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { TicketingController } from './ticketing.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TicketingController],
  providers: [TicketingService, PrismaService]
})
export class TicketingModule {}
