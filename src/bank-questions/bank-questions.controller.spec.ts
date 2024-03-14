import { Test, TestingModule } from '@nestjs/testing';
import { BankQuestionsController } from './bank-questions.controller';
import { BankQuestionsService } from './bank-questions.service';

describe('BankQuestionsController', () => {
  let controller: BankQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankQuestionsController],
      providers: [BankQuestionsService],
    }).compile();

    controller = module.get<BankQuestionsController>(BankQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
