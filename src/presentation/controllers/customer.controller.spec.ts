import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '.';
import { CustomerService } from '../../business/services';
import { CustomerRepository, DocumentTypeRepository } from '../../data/persistence';
import { CustomerModule } from '../../application/modules';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useClass: CustomerRepository && DocumentTypeRepository,
        },
      ]
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
