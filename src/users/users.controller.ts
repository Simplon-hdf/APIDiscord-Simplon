import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'User as created !',
  })

  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAccount(createUserDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'ticket as been found !',
  })
  findUserByUuid(@Param('id') user_uuid: string) {
    return this.usersService.findOne({
      user_uuid: user_uuid
    });
  }
}
