import { Module } from '@nestjs/common';
import { AccountController } from '../controllers/account.controller';
import { AccountService, CustomerService } from '../services';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DocumentTypeRepository } from '../persistence';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [AccountService, AccountRepository, AccountTypeRepository, CustomerService, CustomerRepository, DocumentTypeRepository],
})
export class AccountModule {}