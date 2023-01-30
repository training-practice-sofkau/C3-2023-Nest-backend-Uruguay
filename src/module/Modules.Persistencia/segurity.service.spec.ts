import { Test, TestingModule } from '@nestjs/testing';
import { SegurityService } from './segurity.service';

describe('SegurityService', () => {
  let service: SegurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SegurityService],
    }).compile();

    service = module.get<SegurityService>(SegurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
