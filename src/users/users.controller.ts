import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUserDto } from './dto/delete-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('guilds/:uuid')
  getUsersByGuild(@Param('uuid') uuid: string) {
    return this.usersService.getUserByGuildUUID(uuid);
  }

  @Get(':uuid')
  getUserByUUID(@Param('uuid') uuid: string) {
    return this.usersService.getUser(uuid);
  }

  @Delete('delete')
  deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.usersService.deleteUser(deleteUserDto);
  }
}
