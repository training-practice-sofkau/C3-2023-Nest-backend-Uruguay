import { Module } from '@nestjs/common';
import { TransferController } from '../../presentation/controllers';
import { AccountService, CustomerService, TransferService } from '../../business/services';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DocumentTypeRepository, TransferRepository } from '../../data/persistence';

@Module({
    imports: [],
    controllers: [TransferController],
    providers: [TransferService, TransferRepository, AccountService, AccountRepository, AccountTypeRepository, CustomerService, CustomerRepository, DocumentTypeRepository],
})
export class TransferModule {}
