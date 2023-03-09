import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto {
  category_uuid: string;
  category_name: string;
  guild_uuid: string;
}
