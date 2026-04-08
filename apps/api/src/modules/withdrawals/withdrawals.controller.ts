import { Controller, Get } from '@nestjs/common';

@Controller('withdrawals')
export class WithdrawalsController {
  @Get()
  index() {
    return { module: 'withdrawals', status: 'ok' };
  }
}
