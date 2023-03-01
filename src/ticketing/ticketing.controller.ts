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
import { registerMessageDto } from './dto/register-message.dto';

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

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'ticket as been found !',
  })
  findTicketById(@Param('id') id: number) {
    return this.ticketingService.findTicketById(id);
  }

  @Post(':ticket_id/messages/new')
  @ApiResponse({
    status: 200,
    description: 'message has been found',
  })
  registerMessage(@Param('ticket_id') ticketId: number, @Body() registerMessageDto: registerMessageDto
  ) {
    return this.ticketingService.createNewMessage(registerMessageDto, ticketId);
  }

  @Get(':ticket_id/messages')
  @ApiResponse({
    status: 200,
    description: 'messages as been found !',
  })
  findMessagesByTicketId(@Param('ticket_id') id: number) {
    return this.ticketingService.findMessageByTIcketId(id);
  }
}
