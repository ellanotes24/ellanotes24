import { Module } from '@nestjs/common';
import { OfferwallsController } from './offerwalls.controller';

@Module({
  controllers: [OfferwallsController],
})
export class OfferwallsModule {}
