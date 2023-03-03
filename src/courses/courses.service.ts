import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma.service';
import { courses, Prisma } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.coursesCreateInput): Promise<courses> {
    return this.prisma.courses.create({
      data,
    });
  }

  findAll(): Promise<courses[]> {
    return this.prisma.courses.findMany({});
  }

  findOne(coursesWhereInput: Prisma.coursesWhereInput): Promise<courses> {
    return this.prisma.courses.findFirst({
      where: coursesWhereInput,
    });
  }

  async createCourse(createCoursesDto: CreateCourseDto) {
    const course = await this.findOne({
      course_name: createCoursesDto.course_name,
    });

    if (course !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Courses already exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.create({
        course_name: createCoursesDto.course_name,
        roles: {
          connect: {
            id: 0,
          },
        },
      }),
    };
  }
}
