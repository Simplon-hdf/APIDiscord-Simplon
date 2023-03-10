import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SignatureService } from './signature/signature.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private signature: SignatureService,
    private prisma: PrismaService,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    console.log('change');
    await this.prisma.promo.updateMany({
      data: { code_request: true },
    });
  }
}
