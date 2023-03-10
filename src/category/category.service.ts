import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.categoryCreateInput): Promise<category> {
    return this.prisma.category.create({
      data,
    });
  }

  categories(
    categoryWhereInput: Prisma.categoryWhereInput,
  ): Promise<category[]> {
    return this.prisma.category.findMany({
      where: {
        ...categoryWhereInput,
      },
    });
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

    const guild = await this.prisma.guilds.findFirst({
      where: {
        guild_uuid: createCategoryDto.guild_uuid,
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      data: await this.create({
        category_uuid: createCategoryDto.category_uuid,
        category_name: createCategoryDto.category_name,
        guilds: {
          connect: {
            id: guild.id,
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
    const category = await this.categories({
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

  async updateCategoryName(updateCategoryDto: UpdateCategoryDto) {
    const category = await this.category({
      category_uuid: updateCategoryDto.category_uuid,
    });

    if (category === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Category not exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.prisma.category.update({
        where: {
          id: category.id,
        },
        data: {
          category_name: updateCategoryDto.category_name,
        },
      }),
    };
  }

  async deleteCategory(categoryUUID: string) {
    const category = await this.category({
      category_uuid: categoryUUID,
    });

    if (category === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Category not exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.prisma.category.delete({
        where: {
          id: category.id,
        },
      }),
    };
  }
}
