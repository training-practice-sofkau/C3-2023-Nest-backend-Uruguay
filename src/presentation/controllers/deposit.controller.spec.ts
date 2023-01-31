import { Test, TestingModule } from '@nestjs/testing';
import { DepositController } from './deposit.controller';
import { AccountRepository, AccountTypeRepository, DepositRepository } from '../../data/persistence';
import { AccountService, DepositService } from '../../business/services';
import { AccountModule, DepositModule } from '../../application/modules';

describe('DepositController', () => {
  let controller: DepositController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DepositModule, AccountModule],
      controllers: [DepositController],
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

    controller = module.get<DepositController>(DepositController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
