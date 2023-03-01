import { RegisterTicketDto } from './register-ticket.dto';
import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTicketDto extends PickType(RegisterTicketDto, ['ticket_state'] as const) {
}


