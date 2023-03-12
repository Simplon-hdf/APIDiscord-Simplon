import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma.service';
import { courses, Prisma } from '@prisma/client';
import { GuildsService } from '../guilds/guilds.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly guilds: GuildsService,
    private readonly users: UsersService,
    @Inject(forwardRef(() => RolesService))
    private readonly roles: RolesService,
  ) {}
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

  findMany(coursesWhereInput: Prisma.coursesWhereInput): Promise<courses[]> {
    return this.prisma.courses.findMany({
      where: coursesWhereInput,
    });
  }

  async createCourse(createCoursesDto: CreateCourseDto) {
    // const course = await this.findOne({
    //   course_name: createCoursesDto.course_name,
    //   AND: {
    //     guilds: {
    //       guild_uuid: createCoursesDto.guild_uuid,
    //     },
    //   },
    // });
    //
    // if (course !== null) {
    //   return {
    //     statusCode: HttpStatus.CONFLICT,
    //     error: 'Courses already exist',
    //   };
    // }
    //
    // const role = await this.roles.role({
    //   role_uuid: createCoursesDto.role_uuid,
    // });
    //
    // if (role === null) {
    //   return {
    //     statusCode: HttpStatus.CONFLICT,
    //     error: 'Role not exist',
    //   };
    // }
    //
    // const guild = await this.guilds.findOne({
    //   guild_uuid: createCoursesDto.guild_uuid,
    // });
    //
    // return {
    //   statusCode: HttpStatus.OK,
    //   data: await this.create({
    //     course_name: createCoursesDto.course_name,
    //     roles: {
    //       connect: {
    //         id: role.id,
    //       },
    //     },
    //     guilds: {
    //       connect: {
    //         id: guild.id,
    //       },
    //     },
    //   }),
    // };
  }

  async getCoursesByGuild(guild_uuid: string) {
    const guild = await this.guilds.findOne({
      guild_uuid: guild_uuid,
    });

    if (guild === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Guild not exist',
      };
    }

    const course = await this.findMany({
      guilds: {
        id: guild.id,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      data: course,
    };
  }

  async getUsersByCourses(course_name: string, guild_uuid: string) {
    const courses = await this.getCoursesByGuild(guild_uuid);

    if (courses.statusCode === HttpStatus.CONFLICT) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Guild not exist',
      };
    }

    const course = courses.data.find(
      (course) => course.course_name === course_name,
    );

    console.log(course_name);

    if (course === undefined) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Course not exist',
      };
    }

    const promos = await this.prisma.promo.findMany({
      where: {
        courses: {
          id: course.id,
        },
      },
    });

    const users = [];

    for (const promo of promos) {
      const users_promo = await this.users.getUsersByPromo(promo.id);

      for (const user of users_promo) {
        users.push(user);
      }
    }

    return {
      statusCode: HttpStatus.OK,
      data: users,
    };
  }
}
