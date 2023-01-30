import { Module } from '@nestjs/common';
import { DepositController } from '../controllers';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository } from '../persistence';
import { DepositService, AccountService, CustomerService } from '../services';

@Module({
    imports: [],
    controllers: [DepositController],
    providers: [DepositService, DepositRepository, AccountService, AccountRepository, AccountTypeRepository, CustomerService, CustomerRepository, DocumentTypeRepository],
})
export class DepositModule {}
