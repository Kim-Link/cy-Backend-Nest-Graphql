import { Test, TestingModule } from '@nestjs/testing';
import { EightAreaResolver } from './eight_area.resolver';

describe('EightAreaResolver', () => {
  let resolver: EightAreaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EightAreaResolver],
    }).compile();

    resolver = module.get<EightAreaResolver>(EightAreaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
