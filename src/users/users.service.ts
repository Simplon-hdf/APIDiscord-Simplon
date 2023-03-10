import { HttpStatus, Injectable } from '@nestjs/common';
import { guilds, Prisma, users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GuildsService } from '../guilds/guilds.service';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly guilds: GuildsService,
  ) {}

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

  async getUsersByPromo(promo_id: number): Promise<users[] | null> {
    const participer = await this.prisma.participer.findMany({
      where: {
        promo: {
          id: promo_id,
        },
      },
    });

    const users = [];

    for (const part of participer) {
      const user = await this.findOne({
        id: part.id,
      });
      users.push(user);
    }

    return users;
  }

  getUsersByUUID(user_uuid: string): Promise<users | null> {
    return this.prisma.users.findFirst({
      where: {
        user_uuid: user_uuid,
      },
    });
  }

  async getUser(user_uuid: string) {
    const users = await this.getUsersByUUID(user_uuid);

    if (users === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Users not found',
      };
    }

    const appartenir = await this.prisma.appartenir.findMany({
      where: {
        users: users,
      },
    });

    const guilds = [];

    for (const app of appartenir) {
      const guild = await this.guilds.findOne({
        id: app.id_guilds,
      });
      guilds.push(guild);
    }

    if (guilds.length === 0) {
      return null;
    }

    return guilds;
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    const user = await this.getUsersByUUID(deleteUserDto.user_uuid);

    if (user === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'User not found',
      };
    }

    const appartenir = await this.prisma.appartenir.findFirst({
      where: {
        users: {
          id: user.id,
        },
        AND: {
          guilds: {
            guild_uuid: deleteUserDto.guild_uuid,
          },
        },
      },
    });

    if (appartenir === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'User not found in guild',
      };
    }

    await this.prisma.appartenir.delete({
      where: {
        id_id_guilds: appartenir,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      data: 'User deleted',
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.findOne({
      user_uuid: createUserDto.user_uuid,
    });

    if (user !== null) {
      const appartenir = await this.prisma.appartenir.findFirst({
        where: {
          guilds: {
            id: createUserDto.id_guilds,
          },
          AND: {
            users: {
              id: user.id,
            },
          },
        },
      });

      if (appartenir !== null) {
        return {
          statusCode: HttpStatus.CONFLICT,
          error: 'User already exist',
        };
      }
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

  getUserByGuildUUID(guild: string) {
    const users = this.prisma.users.findMany({
      where: {
        guilds: {
          guild_uuid: guild,
        },
      },
    });
  }
}
