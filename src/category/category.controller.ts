import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('register')
  register(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.registerCategory(createCategoryDto);
  }

  @Get('guilds/:uuid')
  getCategoryByGuildUUID(@Param('uuid') uuid: string) {
    return this.categoryService.getCategoryByGuild(uuid);
  }

  @Delete('delete/:categoryUUID')
  deleteCategory(@Param('categoryUUID') categoryUUID: string) {
    return this.categoryService.deleteCategory(categoryUUID);
  }

  @Patch('update/name')
  updateCategoryName(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategoryName(updateCategoryDto);
  }
}
