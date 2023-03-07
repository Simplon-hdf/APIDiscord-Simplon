import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('register')
  create(@Body() createCoursesDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCoursesDto);
  }

  // Permet de retrouver les cours d'une guild
  @Get('guilds/:uuid')
  getCourse(@Param('uuid') uuid: string) {
    return this.coursesService.getCoursesByGuild(uuid);
  }

  @Get('users')
  getUsersByCourses(@Body() courses_name: string, guild_uuid: string) {
    return this.coursesService.getUsersByCourses(courses_name, guild_uuid);
  }
}
