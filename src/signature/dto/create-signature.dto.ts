import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateSignatureDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(16, 20)
  trainerUuid: string;
}
