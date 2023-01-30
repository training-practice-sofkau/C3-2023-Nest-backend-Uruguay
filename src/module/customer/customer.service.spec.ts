import { Test, TestingModule } from '@nestjs/testing';
import { CusotmerService } from './customer.service';

describe('CusotmerService', () => {
  let service: CusotmerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CusotmerService],
    }).compile();

    service = module.get<CusotmerService>(CusotmerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
