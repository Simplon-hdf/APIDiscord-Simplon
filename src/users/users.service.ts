import { Injectable } from '@nestjs/common';
import { Prisma, users } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.usersCreateInput): Promise<users> {
    return this.prisma.users.create({
      data,
    });
  }

  findAll(): Promise<users[]> {
    return this.prisma.users.findMany();
  }

  findOne(userWhereInput: Prisma.usersWhereInput): Promise<users | null> {
    return this.prisma.users.findFirst({
      where: userWhereInput,
    });
  }

  update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  remove(where: Prisma.usersWhereUniqueInput) {
    return this.prisma.users.delete({
      where,
    });
  }
}
