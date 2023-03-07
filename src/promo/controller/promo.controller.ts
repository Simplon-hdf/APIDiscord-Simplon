import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PromoService } from '../service/promo.service';
import { promo } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { RegisterPromoDto } from '../dto/RegisterPromoDTO';
import { UpdatePromoDTO } from '../dto/UpdatePromoDTO';

@ApiTags('Promo')
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
  async createPromo(@Body() data: RegisterPromoDto): Promise<promo> {
    return this.promoService.createPromo(data);
  }

  @Put('/update/:id')
  async updatePromo(
    @Body() data: UpdatePromoDTO,
    @Param('id') id: string,
  ): Promise<promo> {
    return this.promoService.updatePromo(data, +id);
  }
}
