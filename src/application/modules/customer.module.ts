import { Module } from '@nestjs/common';
import { CustomerService } from '../../business/services';
import { CustomerController } from '../../presentation/controllers';
import { CustomerRepository, DocumentTypeRepository } from '../../data/persistence';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, DocumentTypeRepository],
  exports: [CustomerService, CustomerRepository, DocumentTypeRepository],
})
export class CustomerModule {}
