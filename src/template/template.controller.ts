import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindTemplateDto } from './dto/find-template.dto';

@Controller('template')
@ApiTags('Template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post('register')
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.createTemplateForCourse(createTemplateDto);
  }

  @Patch('add')
  addChannelToCourseTemplate(@Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templateService.addChannelToCourseTemplate(updateTemplateDto);
  }

  @Get('course')
  findTemplateOfCourse(@Body() findTemplateDto: FindTemplateDto) {
    return this.templateService.getTemplateOfCourse(findTemplateDto);
  }
}
