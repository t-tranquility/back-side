import { Test, TestingModule } from '@nestjs/testing';
import { SunsController } from './suns.controller';
import { SunsService } from './suns.service';

describe('SunsController', () => {
  let controller: SunsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SunsController],
      providers: [SunsService],
    }).compile();

    controller = module.get<SunsController>(SunsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
