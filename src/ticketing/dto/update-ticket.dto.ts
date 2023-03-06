import { RegisterTicketDto } from './register-ticket.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateTicketDto extends PickType(RegisterTicketDto, ['ticket_state'] as const) {
}


