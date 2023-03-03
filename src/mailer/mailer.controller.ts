import { Controller, Post, Body } from '@nestjs/common';
import { MailerServices } from './mailer.service';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('mailer')
@ApiTags('Mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerServices) {}

  @Post('/send')
  @ApiResponse({
    status: 200,
    description: 'email was send !',
  })
  register(@Body() CreateMailerDto: CreateMailerDto) {
    return this.mailerService.sendNewMessageByEmail(CreateMailerDto);
  }

}
