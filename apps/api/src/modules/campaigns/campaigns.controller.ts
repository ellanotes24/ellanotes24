import { Controller, Get } from '@nestjs/common';

@Controller('campaigns')
export class CampaignsController {
  @Get()
  index() {
    return { module: 'campaigns', status: 'ok' };
  }
}
