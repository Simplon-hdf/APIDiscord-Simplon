import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { CreateTicketingDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('ticket')
@ApiTags('Ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

}
