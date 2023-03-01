import { Injectable, NotFoundException } from '@nestjs/common';
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

  findMessageByTicketId(id: number) {
    return this.getMessagesByTicketId({ id });
  }

  updateMessageByMessageId(message_uuid: string) {
    return this.updateMessageById({ message_uuid });
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
        ticket_state: TicketDto.ticket_state,
        ticket_tag: TicketDto.ticket_tag,
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

      return {
        statusCode: 200,
        data: newTicket,
      };
    } catch (err) {
      console.log(err);
      if (err.name != 'NotFoundError') {
        return err;
      } else {
        return 'The ticket could not be created please check the input fields';
      }
    }
  }

  async createNewMessage(
    registerMessageDto: registerMessageDto,
    ticketId: number,
  ) {
    try {
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

      return {
        statusCode: 200,
        data: message,
      };
    } catch (err) {
      if (err.name != 'NotFoundError') {
        return err;
      } else {
        return {
          statusCode: 404,
          message: 'Ticket was not found for save message',
        };
      }
    }
  }

  async getTicketByTicketId(ticketWhereInput: Prisma.ticketWhereInput) {
    try {
      const ticket = await this.prisma.ticket.findFirstOrThrow({
        where: { id: Number(ticketWhereInput.id) },
      });

      return {
        statusCode: 200,
        data: ticket,
      };
    } catch (err) {
      if (err.name != 'NotFoundError') {
        return err;
      } else {
        return {
          statusCode: 404,
          message: 'Ticket not found',
        };
      }
    }
  }

  async getMessagesByTicketId(ticketWhereInput: Prisma.ticketWhereInput) {
    try {
      const messages = await this.prisma.messages.findMany({
        where: {
          id_ticket: Number(ticketWhereInput.id),
        },
      });

      // TODO: Handle event for no messages

      return {
        statusCode: 200,
        data: messages,
      };
    } catch (err) {
      if (err.name != 'NotFoundError') {
        return err;
      } else {
        return {
          statusCode: 404,
          message: 'Ticket not found',
        };
      }
    }
  }

  async updateMessageById(messagesWhereInput: Prisma.messagesWhereInput) {
    try {
      const updateMessageId = await this.prisma.messages.findFirstOrThrow({
        where: {
          message_uuid: messagesWhereInput.message_uuid,
        },
      });

      const updateMessage = await this.prisma.messages.update({
        where: {
          id: updateMessageId.id,
        },
        data: {
          message_content: String(messagesWhereInput.message_content),
        },
      });

      return {
        statusCode: 200,
        data: updateMessage,
      };
    } catch (err) {
      if (err.name != 'NotFoundError') {
        return err;
      } else {
        return {
          statusCode: 404,
          message: 'Message not found',
        };
      }
    }
  }
}
