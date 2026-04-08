import { Controller, Get } from '@nestjs/common';

@Controller('fraud')
export class FraudController {
  @Get()
  index() {
    return { module: 'fraud', status: 'ok' };
  }
}
