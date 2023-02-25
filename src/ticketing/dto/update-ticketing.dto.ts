import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketingDto } from './create-ticket.dto';

export class UpdateTicketingDto extends PartialType(CreateTicketingDto) {}
