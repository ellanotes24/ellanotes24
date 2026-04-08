import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  index() {
    return { module: 'tasks', status: 'ok' };
  }
}
