import { Controller, Get } from '@nestjs/common';

@Controller('deposits')
export class DepositsController {
  @Get()
  index() {
    return { module: 'deposits', status: 'ok' };
  }
}
