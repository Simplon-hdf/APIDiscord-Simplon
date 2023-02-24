import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'The user should have a id' })
    @IsString()
    uuid: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'The user should have a username' })
    @IsString()
    @Length(3, 50)
    username: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'The user should have a mail' })
    @IsBoolean()
    mail: string;
}
