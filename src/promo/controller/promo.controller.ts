import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('guild/:uuid')
  async getPromosByUUID(@Param('uuid') uuid: string): Promise<promo[]> {
    return this.promoService.getPromosByGuildUUID(uuid);
  }

  @Get(':id')
  async getPromo(@Param('id') id: string): Promise<promo> {
    return this.promoService.getPromo(+id);
  }

  @Get('guild/:uuid/state/:state')
  async getPromoByState(
    @Param('state') state: string,
    @Param('uuid') uuid: string,
  ): Promise<promo[]> {
    return this.promoService.getPromoByState(
      uuid,
      state.toLowerCase() == 'true',
    );
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

  @Delete('/delete/:id')
  async deletePromo(@Param('id') id: string): Promise<any> {
    return this.promoService.deletePromo(+id);
  }
}
