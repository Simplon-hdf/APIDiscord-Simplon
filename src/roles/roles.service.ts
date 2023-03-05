import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, roles } from '@prisma/client';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class RolesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courses: CoursesService,
  ) {}

  create(data: Prisma.rolesCreateInput) {
    return this.prisma.roles.create({
      data,
    });
  }

  role(roleWhereInput: Prisma.rolesWhereInput): Promise<roles> {
    return this.prisma.roles.findFirst({
      where: roleWhereInput,
    });
  }

  roles(): Promise<roles[]> {
    return this.prisma.roles.findMany();
  }

  async registerRole(createDtoRole: CreateRoleDto) {
    const role = await this.role({
      role_uuid: createDtoRole.role_uuid,
    });

    if (role !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Role already registered',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: await this.create({
        role_uuid: createDtoRole.role_uuid,
        role_color: createDtoRole.role_color,
        role_name: createDtoRole.role_name,
        guilds: {
          connect: {
            id: createDtoRole.guilds_id,
          },
        },
      }),
    };
  }

  async getRoleByCourse(course_name: string) {
    const course = await this.courses.findOne({
      course_name: course_name,
    });

    const role = this.role({
      courses: {
        some: {
          id: course.id,
          AND: {
            id_guilds: course.id_guilds,
          },
        },
      },
    });

    if (role === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Ressource not exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: role,
    };
  }

  async getRoleByUUID(uuid: string) {
    const role = await this.role({
      role_uuid: uuid,
    });

    if (role === null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: 'Ressource not exist',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: role,
    };
  }
}
