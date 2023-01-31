import { Test, TestingModule } from '@nestjs/testing';
import { DepositService, AccountService } from '.';
import { AccountModule, DepositModule } from '../../application/modules';
import { AccountRepository, AccountTypeRepository, DepositRepository } from '../../data/persistence';

describe('DepositService', () => {
  let service: DepositService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DepositModule, AccountModule],
      controllers: [],
      providers: [
        {
          provide: DepositService,
          useClass: DepositRepository,
        },
        {
          provide: AccountService,
          useClass: AccountRepository && AccountTypeRepository,
        },
      ]
    }).compile();

    service = module.get<DepositService>(DepositService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
