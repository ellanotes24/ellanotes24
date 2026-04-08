import { Controller, Get } from '@nestjs/common';

@Controller('settings')
export class SettingsController {
  @Get()
  index() {
    return { module: 'settings', status: 'ok' };
  }
}
