import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { courses, Prisma } from '@prisma/client';
import { GuildService } from '../guild/guild.service';

@Injectable()
export class SignatureService {
  constructor(
    private prisma: PrismaService,
    private users: UsersService,
    private guild: GuildService,
  ) {}

  async create(learnerUuid: string, trainerUuid: CreateSignatureDto) {
    const trainer = await this.users.getUserbyUUID(trainerUuid.trainerUuid);
    const learner = await this.users.getUserbyUUID(learnerUuid);

    const reportLimit = await this.checkIfReportLimit(learner.id);
    if (!reportLimit) {
      await this.prisma.signature.create({
        data: {
          id_learner: learner.id,
          id_trainer: trainer.id,
        },
      });
      return true;
    } else {
      return false;
    }
  }

  async checkIfReportLimit(learnerId) {
    const signatures = await this.prisma.signature.findMany({
      where: {
        id_learner: learnerId,
      },
    });
    const now = new Date();
    let morningCount = 0;
    let afternoonCount = 0;
    signatures.forEach((signature) => {
      const start = new Date(signature.created_at);
      start.setHours(0, 0, 0, 0);
      const end = new Date(signature.created_at);
      end.setHours(12, 30, 0, 0);

      const isBetween1 =
        start <= signature.created_at &&
        signature.created_at <= end &&
        start <= now &&
        now <= end;

      isBetween1 ? (morningCount += 1) : (afternoonCount += 1);
    });

    return afternoonCount >= 3 || morningCount >= 3;
  }

  async getPromoUuidByTrainerUuid(trainerUUID) {
    const trainer = await this.users.getUserbyUUID(trainerUUID);
    const promosIds = await this.users.getUserPromo(trainer);
    const promos = [];

    for (const element of promosIds) {
      const promo = await this.getPromoNameByPromoId({
        id: element.id_promo,
      });
      promos.push(promo);
    }
    return {
      statusCode: HttpStatus.OK,
      data: promos,
    };
  }

  async getUsersByPromoId(promoId: number) {
    return await this.users.getUserByPromoId({ id_promo: promoId });
  }

  getPromoNameByPromoId(promoWhereUniqueInput: Prisma.promoWhereUniqueInput) {
    return this.prisma.promo.findUnique({
      where: promoWhereUniqueInput,
      include: {
        roles: {
          select: {
            role_name: true,
          },
        },
      },
    });
  }

  async getTrainersByPromoId(promoId: number): Promise<any> {
    const participer = await this.prisma.participer.findMany({
      where: { id_promo: promoId },
    });
    const trainerList = [];
    for (const element of participer) {
      const promo = await this.prisma.users.findFirst({
        where: {
          id: element.id,
        },
      });
      trainerList.push(promo);
    }
    return trainerList;
  }

  async getTrainerByUserUuid(userUuid: string): Promise<any> {
    const learner = await this.users.getUserbyUUID(userUuid);
    return await this.getTrainersByPromoId(learner.id_promo);
  }

  async getRoleByUserUuid(userId: string) {
    const learner = await this.users.findOne({ user_uuid: userId });
    const role = await this.prisma.roles.findFirst({
      where: { id: learner.id_roles },
    });
    return role.role_name;
  }

  getCoursesByGuildId(guildId: number): Promise<courses[]> {
    return this.prisma.courses.findMany({ where: { id_guilds: guildId } });
  }

  remove(id: number) {
    return `This action removes a #${id} signature`;
  }

  async requestReportStatus(learnerUuid: string): Promise<boolean> {
    const learnerPromo = await this.users.getUserbyUUID(learnerUuid);
    const promoId = await this.prisma.promo.findFirst({
      where: { id: learnerPromo.id_promo },
    });
    return promoId.code_request;
  }

  async hasReport(learnerUuid: string): Promise<boolean> {
    const learner = await this.users.getUserbyUUID(learnerUuid);
    const now = new Date();
    const reset = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      12,
      30,
      0,
      0,
    );
    const signature = await this.prisma.signature.findFirst({
      where: {
        id_learner: learner.id,
        created_at: {
          gte: now <= reset ? now : reset,
          lt:
            now <= reset
              ? reset
              : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        },
      },
    });
    return Boolean(signature);
  }

  async changeStatus(promoId: number): Promise<boolean> {
    const promo = await this.prisma.promo.findFirst({
      where: {
        id: promoId,
      },
    });
    if (promo.code_request === true) {
      await this.prisma.promo.update({
        where: { id: promoId },
        data: { code_request: false },
      });
    } else if (promo.code_request === false) {
      await this.prisma.promo.update({
        where: { id: promoId },
        data: { code_request: true },
      });
    }
    return true;
  }
}
