import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '.';
import { AccountModule } from '../../application/modules';
import { AccountRepository, AccountTypeRepository } from '../../data/persistence';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
      controllers: [],
      providers: [
        {
          provide: AccountService,
          useClass: AccountRepository && AccountTypeRepository,
        },
      ]
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
