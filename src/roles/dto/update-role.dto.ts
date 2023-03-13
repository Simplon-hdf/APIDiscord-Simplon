import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto {
  role_name?: string;
  role_uuid: string;
  role_color?: string;

  guild_uuid: string;
}
