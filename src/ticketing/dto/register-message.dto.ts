import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class registerMessage {
    @ApiProperty()
    @IsNotEmpty({ message: 'The message of ticket should have a content' })
    @IsString()
    message_content: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'The message of ticket should have a tag' })
    @IsString()
    tag: string;
  
}
