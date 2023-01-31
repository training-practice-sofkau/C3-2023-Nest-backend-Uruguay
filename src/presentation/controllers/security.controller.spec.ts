import { Test, TestingModule } from '@nestjs/testing';
import { SecurityController } from '.';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DocumentTypeRepository } from '../../data/persistence';
import { JwtService } from '@nestjs/jwt';
import { AccountService, CustomerService, SecurityService } from '../../business/services';
import { AccountModule, CustomerModule, SecurityModule } from '../../application/modules';


describe('SecurityController', () => {
  let controller: SecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SecurityModule, CustomerModule, AccountModule],
      controllers: [SecurityController],
      providers: [SecurityService, JwtService,
        {
          provide: CustomerService,
          useClass: CustomerRepository && DocumentTypeRepository,
        },
        {
          provide: AccountService,
          useClass: AccountRepository && AccountTypeRepository,
        },
      ]
    }).compile();

    controller = module.get<SecurityController>(SecurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
