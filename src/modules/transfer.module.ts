import { Module } from '@nestjs/common';
import { TransferController } from '../controllers';
import { AccountService, CustomerService, TransferService } from '../services';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DocumentTypeRepository, TransferRepository } from '../persistence';

@Module({
    imports: [],
    controllers: [TransferController],
    providers: [TransferService, TransferRepository, AccountService, AccountRepository, AccountTypeRepository, CustomerService, CustomerRepository, DocumentTypeRepository],
})
export class TransferModule {}
