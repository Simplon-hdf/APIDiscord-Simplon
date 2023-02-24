import { Injectable } from '@nestjs/common';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SignatureService {
  constructor(private prisma: PrismaService, private user: UsersService) {}
  create(createSignatureDto: CreateSignatureDto) {
    return `This action adds a new signature ${createSignatureDto}`;
  }

  findAll() {
    return `This action returns all signature`;
  }

  findOne(id: number) {
    return this.prisma.users.findFirst({ where: { id: id } });
  }

  getUsersByPromoId(promoId: number) {
    return this.user.getUserByPromoId({ id_promo: promoId });
  }
  update(id: number, updateSignatureDto: UpdateSignatureDto) {
    return `This action updates a #${id} signature for ${updateSignatureDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} signature`;
  }
}
