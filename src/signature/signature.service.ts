import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { courses, guilds, Prisma } from '@prisma/client';
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
      const promo = await this.getPromoById({
        id: element.id_promo,
      });
      promos.push(promo);
    }

    return {
      statusCode: HttpStatus.OK,
      data: promos,
    };
  }

  getPromoById(promoWhereUniqueInput: Prisma.promoWhereUniqueInput) {
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

  getRoleByUserUuid(userId: string) {
    return this.prisma.users.findFirst({
      where: { user_uuid: userId },
      include: {},
    });
  }

  async getRoleByGuildId(guildUuid: string) {
    const guildId = await this.guild.findOne(guildUuid);
    const courses = this.getCoursesByGuildId(guildId.id);
  }

  getCoursesByGuildId(guildId: number): Promise<courses[]> {
    return this.prisma.courses.findMany({ where: { id_guilds: guildId } });
  }

  getUsersByPromoId(promoId: number) {
    return this.users.getUserByPromoId({ id_promo: promoId });
  }
  update(id: number, updateSignatureDto: UpdateSignatureDto) {
    return `This action updates a #${id} signature for ${updateSignatureDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} signature`;
  }

  /*requestReportStatus(promoUuid: number) {
    const statusObject = this.prisma.signature.findFirst({
      where: { promoUuid },
    });
    return statusObject.state;
  }*/

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
