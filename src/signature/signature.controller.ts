import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { CreateSignatureDto } from './dto/create-signature.dto';

@Controller('signature')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Post('codeRequest/:learnerUuid')
  create(
    @Param('learnerUuid') learnerUuid: string,
    @Body() createSignatureDto: CreateSignatureDto,
  ) {
    return this.signatureService.create(learnerUuid, createSignatureDto);
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
  getPromosByTrainerUuid(@Param('uuid') trainerUuid: string) {
    return this.signatureService.getPromoUuidByTrainerUuid(trainerUuid);
  }

  @Get('/signature/reportStatus/:learnerUuid')
  requestReportStatus(@Param('learnerUuid') learnerUuid: string) {
    return this.signatureService.requestReportStatus(learnerUuid);
  }

  @Get('/report/:learnerUuid')
  hasReport(@Param('learnerUuid') learnerUuid: string) {
    return this.signatureService.hasReport(learnerUuid);
  }

  @Get('/codeRequest/changeStatus/:promoUuid')
  changeStatus(@Param('promoUuid') promoId: string) {
    return this.signatureService.changeStatus(+promoId);
  }
}
