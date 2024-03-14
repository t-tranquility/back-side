import { Test, TestingModule } from '@nestjs/testing';
import { BankQuestionsService } from './bank-questions.service';

describe('BankQuestionsService', () => {
  let service: BankQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankQuestionsService],
    }).compile();

    service = module.get<BankQuestionsService>(BankQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
