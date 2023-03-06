import { HttpStatus, Injectable } from '@nestjs/common';
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

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.findOne({
      user_uuid: createUserDto.user_uuid,
    });

    if (user !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'User already exist',
      };
    }

    const newUser = await this.create({
      user_uuid: createUserDto.user_uuid,
      username: createUserDto.user_name,
      mail: createUserDto.mail,
      roles: {
        connect: {
          id: createUserDto.role_id,
        },
      },
    });

    await this.prisma.appartenir.create({
      data: {
        users: {
          connect: {
            id: newUser.id,
          },
        },
        guilds: {
          connect: {
            id: createUserDto.id_guilds,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      data: newUser,
    };
  }
}
