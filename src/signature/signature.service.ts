import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { courses, Prisma, promo, signature } from '@prisma/client';
import { GuildService } from '../guild/guild.service';

@Injectable()
export class SignatureService {
  constructor(
    private prisma: PrismaService,
    private users: UsersService,
    private guild: GuildService,
  ) {}

  create(createSignatureDto: CreateSignatureDto) {
    return `This action adds a new signature ${createSignatureDto}`;
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
