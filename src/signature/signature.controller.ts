import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SignatureService } from './signature.service';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';

@Controller('signature')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Post()
  create(@Body() createSignatureDto: CreateSignatureDto) {
    return this.signatureService.create(createSignatureDto);
  }

  @Get()
  findAll() {
    return this.signatureService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.signatureService.findById(+id);
  }

  @Get('/find/promo/:id')
  geyPromoByUserId(@Param('id') id: string) {
    return this.signatureService.getUsersByPromoId(+id);
  }

  @Get('/signature/reportStatus/:promoId')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSignatureDto: UpdateSignatureDto,
  ) {
    return this.signatureService.update(+id, updateSignatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signatureService.remove(+id);
  }
}
