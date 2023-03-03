import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
export class CreateMailerDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'The mail should have an id' })
    @IsNumber()
    ticket_id: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'The mail should have an tag' })
    @IsString()
    ticket_tag: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The mail should have an status' })
    @IsString()
    ticket_state: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The mail should have an new message to send' })
    @IsString()
    message: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The mail should have an email' })
    @IsString()
    receiver_email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The mail should have an user email' })
    @IsString()
    user_email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The mail should have an user name' })
    @IsString()
    user_name: string;

}
