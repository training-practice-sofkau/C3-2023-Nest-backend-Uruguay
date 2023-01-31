import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '.';
import { CustomerModule } from '../../application/modules';
import { CustomerRepository, DocumentTypeRepository } from '../../data/persistence';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
      controllers: [],
      providers: [
        {
          provide: CustomerService,
          useClass: CustomerRepository && DocumentTypeRepository,
        },
      ]
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
