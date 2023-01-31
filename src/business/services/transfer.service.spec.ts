import { Test, TestingModule } from '@nestjs/testing';
import { TransferService } from '.';
import { TransferModule } from '../../application/modules';
import { TransferRepository } from '../../data/persistence';

describe('TransferService', () => {
  let service: TransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TransferModule],
      controllers: [],
      providers: [
        {
          provide: TransferService,
          useClass: TransferRepository,
        },
      ]
    }).compile();

    service = module.get<TransferService>(TransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
