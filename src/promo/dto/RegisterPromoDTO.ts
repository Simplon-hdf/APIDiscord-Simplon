import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterPromoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'This promo need a promo state' })
  promo_state: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'This promo need a code request statement' })
  @IsBoolean()
  code_request: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'This promo need a course id' })
  @IsNumber()
  id_courses: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'This promo need a role id' })
  @IsNumber()
  id_roles: number;
}
