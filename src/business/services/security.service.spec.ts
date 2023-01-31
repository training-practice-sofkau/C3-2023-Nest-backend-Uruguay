import { Test, TestingModule } from '@nestjs/testing';
import { SecurityService, CustomerService, AccountService } from '.';
import { JwtService } from '@nestjs/jwt';
import { AccountModule, CustomerModule, SecurityModule } from '../../application/modules';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DocumentTypeRepository } from '../../data/persistence';

describe('SecurityService', () => {
  let service: SecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SecurityModule, CustomerModule, AccountModule],
      controllers: [],
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

    service = module.get<SecurityService>(SecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
