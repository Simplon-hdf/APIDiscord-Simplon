import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('register')
  registerRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.registerRole(createRoleDto);
  }
}
