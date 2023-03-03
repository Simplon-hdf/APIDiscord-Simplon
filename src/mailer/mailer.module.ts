import { Module } from '@nestjs/common';
import { MailerServices } from './mailer.service';
import { MailerController } from './mailer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MailerController],
  providers: [MailerServices, PrismaService]
})
export class MailerModules {}
