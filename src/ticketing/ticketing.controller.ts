import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { RegisterTicketDto } from './dto/register-ticket.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { registerMessageDto } from './dto/register-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('ticket')
@ApiTags('Ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'ticket as been created !',
  })
  register(@Body() RegisterTicketDto: RegisterTicketDto) {
    return this.ticketingService.createTicket(RegisterTicketDto);
  }

  @Post(':ticket_id/message/new')
  @ApiResponse({
    status: 200,
    description: 'message has been created',
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

  @Post(':ticket_id/update')
  @ApiResponse({
    status: 200,
    description: 'ticket as been updated !',
  })
  updateTicketByIsId(
    @Param('ticket_id') ticketId: number,
    @Body() UpdateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketingService.updateTicketStatusById(
      UpdateTicketDto,
      ticketId,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'ticket as been found !',
  })
  findTicketById(@Param('id') id: number) {
    return this.ticketingService.findTicketById(id);
  }

  @Get('message/:message_uuid')
  @ApiResponse({
    status: 200,
    description: 'ticket as been found !',
  })
  findTicketByMessageUuid(@Param('message_uuid') message_uuid: string) {
    return this.ticketingService.getTicketByMessageUuid(message_uuid);
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
