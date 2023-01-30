import { Module } from '@nestjs/common';
import { SecurityController } from './controllers/security/security.controller';
import { AccountService } from './services/account/account.service';
import { AccountController } from './controllers/account/account.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { TransfersController } from './controllers/transfers/transfers.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { DepositService } from './services/deposit/deposit.service';
import { TransferService } from './services/transfer/transfer.service';
import { CustomerService } from './services/customer/customer.service';
import { SecurityService } from './services/security/security.service';
import { AccountTypeController } from './controllers/account-type/account-type.controller';
import { AccountRepository } from './persistence/repositories/AccountRepo';
import { AccountTypeRepository } from './persistence/repositories/TypeAccountRepo';
import { CustomerRepo } from './persistence/repositories/CustomerRepo';
import { DepositRepository } from './persistence/repositories/DepositRepo';
import { TransferRepository } from './persistence/repositories/TransferRepo';
import { DocumentTypeRepository } from './persistence/repositories/DocumentTypeRepo';


@Module({
  imports: [],
  
  controllers: [SecurityController,
                AccountController,
                CustomerController,
                TransfersController,
                DepositController,
                AccountTypeController],
  
  providers: [AccountService,
              DepositService,
              TransferService,
              CustomerService,
              SecurityService,

              AccountRepository,
              AccountTypeRepository,
              CustomerRepo,
              DepositRepository,
              TransferRepository,
              DocumentTypeRepository,
            ],
})
export class AppModule {}
