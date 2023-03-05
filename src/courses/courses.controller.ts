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
  create(createCoursesDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCoursesDto);
  }

  @Get('/courses/:id')
  getCourse(@Param('id') id: number) {}
}
