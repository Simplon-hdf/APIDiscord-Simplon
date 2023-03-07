import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { promo } from '@prisma/client';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}
  async getAllTodo(): Promise<promo[]> {
    return this.prisma.promo.findMany();
  }
  async getTodo(id: number): Promise<promo | null> {
    return this.prisma.promo.findUnique({ where: { id: Number(id) } });
  }
  async createTodo(data: promo): Promise<promo> {
    return this.prisma.promo.create({
      data,
    });
  }
}
