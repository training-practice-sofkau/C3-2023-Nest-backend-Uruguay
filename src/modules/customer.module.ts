import { Module } from '@nestjs/common';
import { CustomerService } from '../services';
import { CustomerController } from '../controllers';
import { CustomerRepository, DocumentTypeRepository } from '../persistence';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerRepository, DocumentTypeRepository],
})
export class CustomerModule {}
