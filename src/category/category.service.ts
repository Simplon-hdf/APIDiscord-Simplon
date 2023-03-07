import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.categoryCreateInput): Promise<category> {
    return this.prisma.category.create({
      data,
    });
  }

  categories(): Promise<category[]> {
    return this.prisma.category.findMany();
  }

  category(categoryWhereInput: Prisma.categoryWhereInput): Promise<category> {
    return this.prisma.category.findFirst({
      where: categoryWhereInput,
    });
  }

  async registerCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.category({
      category_uuid: createCategoryDto.category_uuid,
    });

    if (category !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'category already exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.create({
        category_uuid: createCategoryDto.category_uuid,
        category_name: createCategoryDto.category_name,
        guilds: {
          connect: {
            id: createCategoryDto.guilds_id,
          },
        },
      }),
    };
  }

  async getCategoryById(id: number) {
    return await this.category({
      id: id,
    });
  }

  async getCategoryByGuild(guildUUID: string) {
    const category = await this.category({
      guilds: {
        guild_uuid: guildUUID,
      },
    });

    if (category === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Guild not exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: category,
    };
  }
}
