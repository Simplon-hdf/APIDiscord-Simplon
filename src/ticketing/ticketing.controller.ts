import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { registerMessage } from './dto/register-message.dto';

@Controller('ticket')
@ApiTags('Ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

  // @Post('ticket/message')
  // @ApiResponse({
  //   status: 200,
  //   description: 'message as registered !',
  // })
  // register(@Body() registerMessageDto: registerMessage) {
  //   return this.ticketingService.registerMessage(registerMessageDto);
  // }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'ticket as been created !',
  })
  register(@Body() CreateTicketDto: CreateTicketDto) {
    return this.ticketingService.createTicket(CreateTicketDto);
  }
}
