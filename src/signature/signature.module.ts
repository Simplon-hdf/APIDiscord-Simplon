import { Module } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { SignatureController } from './signature.controller';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [SignatureController],
  providers: [SignatureService, PrismaService, UsersService],
})
export class SignatureModule {}