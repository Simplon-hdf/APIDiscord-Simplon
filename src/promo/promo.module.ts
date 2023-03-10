import { Module } from '@nestjs/common';
import { PromoService } from './service/promo.service';
import { PromoController } from './controller/promo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PromoService, PrismaService],
  controllers: [PromoController],
})
export class PromoModule {}
