import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { roles } from '@prisma/client';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAll(): Promise<roles[]> {
    return this.rolesService.getAll();
  }

  @Post('register')
  registerRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.registerRole(createRoleDto);
  }

  @Get('guilds/:uuid')
  getRolesByGuild(@Param('uuid') uuid: string) {
    return this.rolesService.getRolesByGuildUUID(uuid);
  }

  @Delete(':uuid')
  deleteRole(@Param('uuid') uuid: string) {
    return this.rolesService.deleteRoleByUUID(uuid);
  }

  @Patch('update')
  updateRole(@Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRoleByUUID(updateRoleDto);
  }
}
