import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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

  async user(userWereInput: Prisma.usersWhereInput): Promise<users | null> {
    return this.prisma.users.findFirst({
      where: userWereInput,
    });
  }

  async createAccount(CreateUserDto: CreateUserDto){
    const user = await this.user({ username: CreateUserDto.username })

    if (user) {
      throw new HttpException('User exist', 200);
    }

    const newUser = this.create({
      ...CreateUserDto,
      user_uuid: CreateUserDto.uuid,
      roles : {
        connect : {
          id: 1
        }
      }
    })

    return newUser;
  }
}
