import { Injectable } from '@nestjs/common';
import { messages, Prisma, ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { RegisterTicketDto } from './dto/register-ticket.dto';
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

  getTicketByMessageUuid(message_uuid: string) {
    return this.findTicketByMessageUuid({ message_uuid: message_uuid });
  }

  findMessageByTicketId(id: number) {
    return this.getMessagesByTicketId({ id });
  }

  updateMessageByMessageId(message_uuid: string) {
    return this.updateMessageById({ message_uuid });
  }

  updateTicketStatusById(data: Prisma.ticketWhereInput, ticket_id: number) {
    return this.updateTicketById(data, ticket_id);
  }

  // Functions

  async createTicket(RegisterTicketDto: RegisterTicketDto) {
    try {
      const roles = await this.prisma.roles.findFirstOrThrow({
        where: { role_uuid: RegisterTicketDto.role_uuid },
      });

      const user = await this.prisma.users.findFirstOrThrow({
        where: { user_uuid: RegisterTicketDto.user_uuid },
      });

      const newTicket = await this.registerTicket({
        ticket_state: RegisterTicketDto.ticket_state,
        ticket_tag: RegisterTicketDto.ticket_tag,
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
        return {
          code: 404,
          message:
            'The ticket could not be created please check the input fields',
        };
      }
    }
  }

  async createNewMessage(
    registerMessageDto: registerMessageDto,
    ticketId: number,
  ) {
    try {
      const ticket = await this.findTicketById(ticketId);

      const message = await this.registerMessage({
        ...registerMessageDto,
        message_uuid: registerMessageDto.message_uuid,
        message_content: registerMessageDto.message_content,
        users: {
          connect: {
            id: ticket.data.id_users,
          },
        },
        ticket: {
          connect: {
            id: ticket.data.id,
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

  async findTicketByMessageUuid(messageWhereInput: Prisma.messagesWhereInput) {
    try {
      const messageID = await this.prisma.messages.findFirstOrThrow({
        where: {
          message_uuid: messageWhereInput.message_uuid,
        },
      });

      const ticket = await this.prisma.ticket.findMany({
        where: {
          id_messages: messageID.id,
        },
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
  async updateTicketById(
    ticketWhereInput: Prisma.ticketWhereInput,
    ticket_id: number,
  ) {
    try {
      const updateTicket = await this.prisma.ticket.update({
        where: {
          id: Number(ticket_id),
        },
        data: {
          ticket_state: String(ticketWhereInput.ticket_state),
        },
      });

      return {
        statusCode: 200,
        data: updateTicket,
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
}
