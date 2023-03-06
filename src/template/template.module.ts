import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { PrismaService } from '../prisma.service';
import { CategoryService } from '../category/category.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, PrismaService, CategoryService],
})
export class TemplateModule {}
