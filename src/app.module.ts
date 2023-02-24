import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { SignatureModule } from './signature/signature.module';

@Module({
  imports: [UsersModule, SignatureModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
