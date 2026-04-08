import { Controller, Get } from '@nestjs/common';

@Controller('wallets')
export class WalletsController {
  @Get()
  index() {
    return { module: 'wallets', status: 'ok' };
  }
}
