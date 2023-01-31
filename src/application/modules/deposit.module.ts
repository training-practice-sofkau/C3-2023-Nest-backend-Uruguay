import { Module } from '@nestjs/common';
import { DepositController } from '../../presentation/controllers';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository } from '../../data/persistence';
import { DepositService, AccountService, CustomerService } from '../../business/services';

@Module({
    imports: [],
    controllers: [DepositController],
    providers: [DepositService, DepositRepository, AccountService, AccountRepository, AccountTypeRepository, CustomerService, CustomerRepository, DocumentTypeRepository],
})
export class DepositModule {}
