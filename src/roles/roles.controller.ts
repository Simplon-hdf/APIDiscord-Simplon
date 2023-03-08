import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { roles } from '@prisma/client';

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
}
