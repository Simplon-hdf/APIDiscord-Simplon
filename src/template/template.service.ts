import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from '../prisma.service';
import { courses, Prisma, template } from '@prisma/client';
import { CategoryService } from '../category/category.service';
import { CoursesService } from '../courses/courses.service';
import { ChannelsService } from '../channels/channels.service';
import { FindTemplateDto } from './dto/find-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courses: CoursesService,
    private readonly channels: ChannelsService,
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

  getTemplateByCourses(course: number | courses): Promise<template> {
    if (typeof course === 'number') {
      return this.template({
        id_courses: course,
      });
    }

    return this.template({
      courses: course,
    });
  }

  async getTemplateOfCourse(findTemplateDto: FindTemplateDto) {
    const course = await this.courses.findOne({
      course_name: findTemplateDto.course_name,
      AND: {
        guilds: {
          guild_uuid: findTemplateDto.guild_uuid,
        },
      },
    });

    if (course === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Course or guild not found',
      };
    }

    const template = await this.getTemplateByCourses(course);

    if (template === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Template not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: template,
    };
  }

  async createTemplateForCourse(createTemplateDto: CreateTemplateDto) {
    const courses = await this.courses.findOne({
      course_name: createTemplateDto.course_name,
      AND: {
        guilds: {
          guild_uuid: createTemplateDto.guild_uuid,
        },
      },
    });

    if (courses === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Course not found',
      };
    }

    const template = await this.getTemplateByCourses(courses);

    if (template !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Template already exists',
      };
    }
    return {
      statusCode: HttpStatus.OK,
      data: await this.create({
        courses: {
          connect: {
            id: courses.id,
          },
        },
      }),
    };
  }

  async addChannelToCourseTemplate(updateTemplateDto: UpdateTemplateDto) {
    const courses = await this.courses.findOne({
      course_name: updateTemplateDto.course_name,
    });

    if (courses === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Course not found',
      };
    }

    const template = await this.getTemplateByCourses(courses);

    if (template === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Template not found',
      };
    }

    const channel = await this.channels.getChannelByUUID(
      updateTemplateDto.channel_uuid,
    );

    if (channel === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Channel not found',
      };
    }

    await this.prisma.associer.create({
      data: {
        template: {
          connect: {
            id: template.id,
          },
        },
        channels: {
          connect: {
            id: channel.id,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      data: 'template updated',
    };
  }
}
