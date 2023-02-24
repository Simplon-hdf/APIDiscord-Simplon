import { Injectable } from '@nestjs/common';
import { Prisma, ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketingDto } from './dto/create-ticketing.dto';

@Injectable()
export class TicketingService {
  constructor(private readonly prisma: PrismaService) {}

  registerTicket(data: Prisma.ticketCreateInput): Promise<ticket> {
    return this.prisma.ticket.create({ data });
  }

  

  // async createTicket(TicketDto: CreateTicketingDto) {
  //   const newTicket = this.registerTicket({
  //     ...TicketDto,
  //     messages: {
  //       connect: {
  //         id: 1
  //       },
  //     },
  //     roles: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //     users: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //   });

  //   return newTicket;
  // }
}
