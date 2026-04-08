import { Controller, Get } from '@nestjs/common';

@Controller('memberships')
export class MembershipsController {
  @Get()
  index() {
    return { module: 'memberships', status: 'ok' };
  }
}
