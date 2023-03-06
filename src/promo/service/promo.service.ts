import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, promo } from '@prisma/client';
import { RegisterPromoDto } from '../dto/RegisterPromoDTO';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<promo[]> {
    return this.prisma.promo.findMany();
  }

  async getPromo(id_to_reach: number): Promise<promo> {
    return this.prisma.promo.findUnique({ where: { id: id_to_reach } });
  }

  async registerPromo(data: Prisma.promoCreateInput): Promise<promo> {
    return this.prisma.promo.create({ data });
  }

  // Func

  async createPromo(dto: RegisterPromoDto) {
    try {
      const course = await this.prisma.courses.findFirstOrThrow({
        where: { id: dto.id_courses },
      });
      const role = await this.prisma.roles.findFirstOrThrow({
        where: { id: dto.id_roles },
      });

      const newPromo = await this.registerPromo({
        promo_state: dto.promo_state,
        code_request: dto.code_request,
        courses: {
          connect: {
            id: course.id,
          },
        },
        roles: {
          connect: {
            id: role.id,
          },
        },
      });

      return {
        statusCode: 201,
        data: newPromo,
      };
    } catch (error) {
      if (error.name != 'NotFoundError') {
        return error;
      } else {
        return "This promo can't be created, check fields";
      }
    }
  }
}
