import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTicketDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'The ticket should have a state' })
    @IsString()
    user_uuid: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The ticket should have a role uuid' })
    @IsString()
    role_uuid: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The ticket should have a tag' })
    @IsString()
    @Length(3, 50)
    ticket_tag: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'The ticket should have a state' })
    @IsString()
    ticket_state: string;
  
}
