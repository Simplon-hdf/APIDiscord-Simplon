import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { promo } from '@prisma/client';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<promo[]> {
    return this.prisma.promo.findMany();
  }

  async getPromo(id_to_reach: number): Promise<promo> {
    return this.prisma.promo.findUnique({ where: { id: id_to_reach } });
  }
}
