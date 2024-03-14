import { Module } from '@nestjs/common';
import { SunsService } from './suns.service';
import { SunsController } from './suns.controller';

@Module({
  controllers: [SunsController],
  providers: [SunsService],
})
export class SunsModule {}
