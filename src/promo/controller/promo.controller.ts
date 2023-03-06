import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PromoService } from '../service/promo.service';
import { promo } from '@prisma/client';
import { RegisterPromoDto } from '../dto/RegisterPromoDTO';

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

  @Post('/create')
  async createPromo(@Body() data: RegisterPromoDto) {
    this.promoService.createPromo(data);
  }
}
