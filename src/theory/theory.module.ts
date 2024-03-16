import { Module } from '@nestjs/common';
import { TheoryService } from './theory.service';
import { TheoryController } from './theory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theory } from './entities/theory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theory])],
  controllers: [TheoryController],
  providers: [TheoryService],
  exports: [TheoryService],
})
export class TheoryModule {}
