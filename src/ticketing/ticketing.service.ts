import { Injectable } from '@nestjs/common';
import { messages, Prisma, ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { registerMessageDto } from './dto/register-message.dto';


@Injectable()
export class TicketingService {
  constructor(private readonly prisma: PrismaService) {}

  registerTicket(data: Prisma.ticketCreateInput): Promise<ticket> {
    return this.prisma.ticket.create({
      data,
    });
  }

  registerMessage(data: Prisma.messagesCreateInput): Promise<messages> {
    return this.prisma.messages.create({
      data,
    });
  }

  findTicketById(id: number) {
    return this.getTicketByTicketId({ id });
  }

  findMessageByTIcketId(id: number){
    return this.getMessagesByTicketId({ id })
  }

  // Functions

  async createTicket(TicketDto: CreateTicketDto) {
    try {

      const roles = await this.prisma.roles.findFirstOrThrow({
        where: { role_uuid: TicketDto.role_uuid },
      });

      const user = await this.prisma.users.findFirstOrThrow({
        where: { user_uuid: TicketDto.user_uuid },
      });


      const newTicket = this.registerTicket({
        ...TicketDto,
        roles: {
          connect: {
            id: roles.id,
          },
        },
        users: {
          connect: {
            id: user.id,
          },
        },
      });

      return newTicket;
      
    } catch (err) {
      console.log(err)
      // if (err.name != 'NotFoundError') {
      //   return err;
      // } else {
      //   return 'The ticket could not be created please check the input fields';
      // }
    }
  }

  async createNewMessage(
    registerMessageDto: registerMessageDto,
    ticketId: number,
  ) {
    const ticket = await this.findTicketById(ticketId);

    const message = this.registerMessage({
      ...registerMessageDto,
      message_uuid: registerMessageDto.message_uuid,
      message_content: registerMessageDto.message_content,
      users: {
        connect: {
          id: ticket.id_users,
        },
      },
      ticket: {
        connect: {
          id: ticket.id,
        },
      },
    });

    return message;
  }

  async getTicketByTicketId(ticketWhereInput: Prisma.ticketWhereInput) {
    try {
      const ticket = await this.prisma.ticket.findFirstOrThrow({
        where: { id: Number(ticketWhereInput.id) },
      });

      return ticket;
    } catch (err) {
      if (err.name != 'NotFoundError') {
        return err;
      } else {
        return 'Ticket not found';
      }
    }
  }

  async getMessagesByTicketId(ticketWhereInput: Prisma.ticketWhereInput) {

    try { 

      const messages = await this.prisma.messages.findMany({ 

        where: { 
          users: {
            id: 1
          }
         }
      })

      return messages;

    }catch(err){
      if (err.name != 'NotFoundError') {
        return err;
      } else {
        return 'Ticket not found';
      }
    }

  }
}
