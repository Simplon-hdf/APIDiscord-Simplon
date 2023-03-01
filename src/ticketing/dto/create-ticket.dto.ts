import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, isNumber, IsNumber, IsString, Length } from 'class-validator';

export class CreateTicketDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'The ticket should have a state' })
    user_uuid: bigint;

    @ApiProperty()
    @IsNotEmpty({ message: 'The ticket should have a role uuid' })
    role_uuid: bigint;

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
