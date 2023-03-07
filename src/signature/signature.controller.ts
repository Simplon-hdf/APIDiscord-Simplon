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

@Controller('signature')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Post('codeRequest/:learnerUuid')
  create(
    @Body() createSignatureDto: CreateSignatureDto,
    @Param('learnerUuid') learnerUuid: string,
  ) {
    return this.signatureService.create(learnerUuid, createSignatureDto);
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
  getPromoByUserId(@Param('id') id: string) {
    return this.signatureService.getUsersByPromoId(+id);
  }

  @Get('find/trainer/:learnerUuid')
  async getTrainerByUserUuid(@Param('learnerUuid') learnerUuid: string) {
    return await this.signatureService.getTrainerByUserUuid(learnerUuid);
  }

  @Get('find/promo/trainer/:uuid')
  getPromosByTrainerUuid(@Param('uuid') promoUuid: string) {
    return this.signatureService.getPromoUuidByTrainerUuid(promoUuid);
  }

  @Get('find/role/user/:uuid')
  getRolesByUserId(@Param('uuid') userId: string) {
    return this.signatureService.getRoleByUserUuid(userId);
  }

  @Get('/signature/reportStatus/:learnerUuid')
  requestReportStatus(@Param('learnerUuid') learnerUuid: string) {
    return this.signatureService.requestReportStatus(learnerUuid);
  }

  @Get('/report/:learnerUuid')
  hasReport(@Param('learnerUuid') learnerUuid: string) {
    return this.signatureService.hasReport(learnerUuid);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signatureService.remove(+id);
  }
}
