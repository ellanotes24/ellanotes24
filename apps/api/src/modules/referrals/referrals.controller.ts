import { Controller, Get } from '@nestjs/common';

@Controller('referrals')
export class ReferralsController {
  @Get()
  index() {
    return { module: 'referrals', status: 'ok' };
  }
}
