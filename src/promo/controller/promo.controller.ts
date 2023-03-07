import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PromoService } from '../service/promo.service';
import { promo } from '@prisma/client';
@Controller('api/v1/promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}
  @Get()
  async getAllTodo(): Promise<promo[]> {
    return this.promoService.getAllTodo();
  }
  @Post()
  async createTodo(@Body() postData: promo): Promise<promo> {
    return this.promoService.createTodo(postData);
  }
  @Get(':id')
  async getTodo(@Param('id') id: number): Promise<promo | null> {
    return this.promoService.getTodo(id);
  }
}
