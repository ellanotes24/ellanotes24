import { Controller, Get } from '@nestjs/common';

@Controller('cms')
export class CmsController {
  @Get()
  index() {
    return { module: 'cms', status: 'ok' };
  }
}
