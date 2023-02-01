import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '.';
import { AccountService } from '../../business/services';
import { AccountRepository, AccountTypeRepository } from '../../data/persistence';
import { AccountModule, CustomerModule } from '../../application/modules';
import { forwardRef } from '@nestjs/common';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, forwardRef( () => CustomerModule)],
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useClass: AccountRepository && AccountTypeRepository,
        },
      ]
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
