import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailerDto } from './dto/create-mailer.dto';

@Injectable()
export class MailerServices {
  constructor(private readonly mailerService: MailerService) {}

  async sendNewMessageByEmail(mailerDto: CreateMailerDto) {
    try {
      return await this.mailerService.sendMail({
        to: mailerDto.receiver_email,
        from: `"no-reply" <${process.env.FROM_EMAIL}>`,
        subject: `[${mailerDto.ticket_state}] | ${mailerDto.ticket_tag} | ${mailerDto.user_name}`,
        template: 'ticket', // `.hbs` extension is appended automatically
        context: {
          ticket_id: mailerDto.ticket_id,
          ticket_tag: mailerDto.ticket_tag,
          ticket_state: mailerDto.ticket_state,
          message: mailerDto.message,
          user_name: mailerDto.user_name,
          user_mail: mailerDto.user_email,
        },
      });
    } catch (err) {
      return err;
    }
  }
}
