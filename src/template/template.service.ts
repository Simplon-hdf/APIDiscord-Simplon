import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, template } from '@prisma/client';

@Injectable()
export class TemplateService {
  constructor(private readonly prisma: PrismaService) {}

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

  linkCategoryToTemplate(categoryUUID, createTemplateDto: CreateTemplateDto) {}
}
