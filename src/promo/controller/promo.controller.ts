import { Controller, Get, Param } from '@nestjs/common';
import { PromoService } from '../service/promo.service';
import { promo } from '@prisma/client';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Get()
  async getAll(): Promise<promo[]> {
    return this.promoService.getAll();
  }

  @Get(':id')
  async getPromo(@Param('id') id: string): Promise<promo> {
    return this.promoService.getPromo(+id);
  }
}
