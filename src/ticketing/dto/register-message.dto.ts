import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class registerMessageDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'The message of ticket should have a uuid' })
    @IsString()
    message_uuid: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The message of ticket should have a content' })
    @IsString()
    message_content: string;

  
    @ApiProperty()
    @IsNotEmpty({ message: 'The message of ticket should have a tag' })
    @IsString()
    tag: string;
  
}
