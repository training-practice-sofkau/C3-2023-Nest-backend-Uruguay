import { Module } from '@nestjs/common';
import { AccountController } from '../../presentation/controllers';
import { AccountService, CustomerService } from '../../business/services';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DocumentTypeRepository } from '../../data/persistence';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [AccountService, AccountRepository, AccountTypeRepository, CustomerService, CustomerRepository, DocumentTypeRepository],
})
export class AccountModule {}