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
import { User } from '../users/entities/user.entity';
0;
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

  @Get('find/role/guild/:uuid')
  getTrainerRoleByGuildUuid(uuid: string) {
    return this.signatureService.getRoleByGuildId(uuid);
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.signatureService.findById(+id);
  }

  @Get('/find/promo/:id')
  getPromoByUserId(@Param('id') id: string) {
    return this.signatureService.getUsersByPromoId(+id);
  }

  @Get('find/promo/trainer/:uuid')
  getPromosByTrainerUuid(@Param('uuid') promoUuid: string) {
    return this.signatureService.getPromoUuidByTrainerUuid(promoUuid);
  }

  @Get('find/role/user/:uuid')
  getRolesByUserId(@Param('uuid') userId: string) {
    return this.signatureService.getRoleByUserUuid(userId);
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
