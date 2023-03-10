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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
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

  @Get(':user_uuid/ticket')
  @ApiResponse({
    status: 200,
    description: 'ticket as been found !',
  })
  findUserTicketWhereStatusIdle(@Param('user_uuid') user_uuid: string) {
    return this.usersService.findUserTicketByStatusIdle({
      user_uuid: user_uuid
    });
  }
}
