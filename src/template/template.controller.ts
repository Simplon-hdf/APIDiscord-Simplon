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

@Controller('template')
@ApiTags('Template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  // Permet de recuperer la category template d'une guild
  @Get('category/:uuid')
  getTemplateCategory(@Param('uuid') uuid: string) {
    return this.templateService.getCategoryLinkedToTemplateByGuild(uuid);
  }
}
