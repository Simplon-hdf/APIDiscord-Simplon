import { Module } from '@nestjs/common';
import { TicketingService } from './services/ticketing/ticketing.service';
import { TicketingService } from './services/ticketing.service';
import { TicketingController } from './controllers/ticketing.controller';
import { TController } from './controllers/t/t.controller';
import { TicketingController } from './controllers/ticketing/ticketing.controller';
import { TicketingService } from './services/ticketing/ticketing.service';
import { Service } from './services/.service';
import { TicketingService } from './services/ticketing/ticketing.service';

@Module({
  providers: [TicketingService, Service],
  controllers: [TicketingController, TController]
})
export class TicketingModule {}
