import { Injectable } from '@nestjs/common';
import { Prisma, ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { registerMessage } from './dto/register-message.dto';

@Injectable()
export class TicketingService {
  constructor(private readonly prisma: PrismaService) {}

  registerTicket(data: Prisma.ticketCreateInput): Promise<ticket> {
    return this.prisma.ticket.create({
      data,
    })
  }

  async createTicket(TicketDto: CreateTicketDto) {
    const newTicket = this.registerTicket({
      ...TicketDto,
      messages: {
        connect: {
          id: 1
        }
      },
      roles: {
        connect: {
          id: 1,
        },
      },
      users: {
        connect: {
          id: 1,
        },
      },
    });

    return newTicket;
  }

  // async create(data: Prisma.messagesCreateInput): Promise<messages> {
  //   return this.prisma.messages.create({ data });
  // }

  // async registerMessage(registerMessageDto: registerMessage){



  //   return await this.create({
  //     ...registerMessageDto,
  //     message_uuid: 1,
  //     users: 
  //   })

  // }

}
