import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTicketingDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'The ticket should have a tag' })
    @IsString()
    @Length(3, 50)
    ticket_tag: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'The ticket should have a state' })
    @IsBoolean()
    ticket_state: boolean;
  
}
