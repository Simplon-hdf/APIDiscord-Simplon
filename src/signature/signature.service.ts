import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
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

    if (!signatures) {
      throw new Error(`Signature not found`);
    }

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

  findAll() {
    return `This action returns all signature`;
  }

  findById(id: number) {
    return this.prisma.users.findFirst({ where: { id: id } });
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

  update(id: number, updateSignatureDto: UpdateSignatureDto) {
    return `This action updates a #${id} signature for ${updateSignatureDto}`;
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
    const signature = await this.prisma.signature.findFirst({
      where: { id_learner: learner.id },
    });
    return !!signature;
  }

  /*checkIfReport(learnerUuid: number, arrayOfReports: arr) {
    if (arrayOfReports.include(learnerUuid)) {
      return true;
    }
  }*/

  incrementVoteCounter(count: number) {
    return (count += 1);
  }
  /*reportForgottenSignature(learnerUuid: number) {
    let count = 0;
    const arrayOfReports = [];

    if (this.checkIfReport(learnerUuid, arrayOfReports)) {
      return 'error'; // TODO: describe error
    } else {
      arrayOfReports.push(learnerUuid);
      while (count < 3) {
        count = this.incrementVoteCounter(count);
        return 'vote has been submitted'; //TODO: describe Vote
      }
      const trainer = this.prisma.users.findUnique({ where: { id: 1 } });

      // TODO: send private message to trainer

      return 'message has been sent'; //TODO: describe message
    }
  }*/
}
