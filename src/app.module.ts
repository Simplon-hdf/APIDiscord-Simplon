import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketingModule } from './ticketing/ticketing.module';
import { TicketingService } from './services/ticketing/ticketing.service';

@Module({
  imports: [TicketingModule],
  controllers: [AppController],
  providers: [AppService, TicketingService],
})
export class AppModule {}
