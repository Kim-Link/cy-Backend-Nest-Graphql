import { Test, TestingModule } from '@nestjs/testing';
import { EightAreaService } from './eight_area.service';

describe('EightAreaService', () => {
  let service: EightAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EightAreaService],
    }).compile();

    service = module.get<EightAreaService>(EightAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
