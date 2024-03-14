import { Test, TestingModule } from '@nestjs/testing';
import { SunsService } from './suns.service';

describe('SunsService', () => {
  let service: SunsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SunsService],
    }).compile();

    service = module.get<SunsService>(SunsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
