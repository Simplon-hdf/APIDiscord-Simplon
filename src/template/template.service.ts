import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, template } from '@prisma/client';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TemplateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly category: CategoryService,
  ) {}

  create(data: Prisma.templateCreateInput): Promise<template> {
    return this.prisma.template.create({
      data,
    });
  }

  template(templateWhereInput: Prisma.templateWhereInput): Promise<template> {
    return this.prisma.template.findFirst({
      where: templateWhereInput,
    });
  }

  templates(): Promise<template[]> {
    return this.prisma.template.findMany({});
  }

  getTemplateById(
    templateWhereUniqueInput: Prisma.templateWhereUniqueInput,
  ): Promise<template> {
    return this.prisma.template.findUnique({
      where: templateWhereUniqueInput,
    });
  }

  getTemplateByCourses(courseId: number): Promise<template> {
    return this.template({
      id_category: courseId,
    });
  }

  /**
   * Permet de lier une catégorie à la catégorie discord indentifié comme template
   * @param categoryUUID UUID de la catégorie à marquer comme template
   */
  async linkCategoryToTemplate(categoryUUID) {
    const category = await this.category.category({
      category_uuid: categoryUUID,
    });

    if (category === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Category not registered',
      };
    }

    const template = await this.create({
      category: {
        connect: {
          id: category.id,
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      data: template,
    };
  }

  async getCategoryLinkedToTemplateByGuild(guildUUID: string) {
    const template = await this.template({
      category: {
        guilds: {
          guild_uuid: guildUUID,
        },
      },
      AND: {
        NOT: {
          id_category: null,
        },
      },
    });

    if (template === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Template not exist for this guild',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: template,
    };
  }
}
