import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { registerMessageDto } from './dto/register-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('ticket')
@ApiTags('Ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

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

  @Post(':ticket_id/message/new')
  @ApiResponse({
    status: 200,
    description: 'message has been found',
  })
  registerMessage(
    @Param('ticket_id') ticketId: number,
    @Body() registerMessageDto: registerMessageDto,
  ) {
    return this.ticketingService.createNewMessage(registerMessageDto, ticketId);
  }

  @Post('message/update')
  @ApiResponse({
    status: 200,
    description: 'ticket as been created !',
  })
  updateMessageByIsId(@Body() UpdateMessageDto: UpdateMessageDto) {
    return this.ticketingService.updateMessageById(UpdateMessageDto);
  }

  @Get(':ticket_id/messages')
  @ApiResponse({
    status: 200,
    description: 'messages as been found !',
  })
  findMessagesByTicketId(@Param('ticket_id') id: number) {
    return this.ticketingService.findMessageByTicketId(id);
  }
}
