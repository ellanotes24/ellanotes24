import { Controller, Get } from '@nestjs/common';

@Controller('offerwalls')
export class OfferwallsController {
  @Get()
  index() {
    return { module: 'offerwalls', status: 'ok' };
  }
}
