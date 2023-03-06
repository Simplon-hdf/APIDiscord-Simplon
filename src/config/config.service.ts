import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { config, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ConfigService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.configCreateInput): Promise<config> {
    return this.prisma.config.create({
      data,
    });
  }
  findAll(): Promise<config[]> {
    return this.prisma.config.findMany();
  }

  findOne(configsWhereInput: Prisma.configWhereInput): Promise<config | null> {
    return this.prisma.config.findFirst({
      where: configsWhereInput,
    });
  }

  update(params: {
    where: Prisma.configWhereUniqueInput;
    data: Prisma.configUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.config.update({
      data,
      where,
    });
  }

  remove(where: Prisma.configWhereUniqueInput) {
    return this.prisma.config.delete({
      where,
    });
  }

  // createConfig(createConfigDto: CreateConfigDto) {
  //   const configs = this.findOne({});
  //
  //   if (configs) {
  //     return {
  //       statusCode: HttpStatus.CONFLICT,
  //       error: 'Guilds already exist',
  //     };
  //   }
  //
  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: this.create({
  //       ...createConfigDto,
  //     }),
  //   };
  // }
}
