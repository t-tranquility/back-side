import { Module } from '@nestjs/common';
import { BankQuestionsService } from './bank-questions.service';
import { BankQuestionsController } from './bank-questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankQuestion } from './entities/bank-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankQuestion])],
  controllers: [BankQuestionsController],
  providers: [BankQuestionsService],
  exports: [BankQuestionsService],
})
export class BankQuestionsModule {}
