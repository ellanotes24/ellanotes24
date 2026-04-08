import { Controller, Get } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  @Get()
  index() {
    return { module: 'notifications', status: 'ok' };
  }
}
