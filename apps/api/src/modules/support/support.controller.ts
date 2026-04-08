import { Controller, Get } from '@nestjs/common';

@Controller('support')
export class SupportController {
  @Get()
  index() {
    return { module: 'support', status: 'ok' };
  }
}
