import { Module } from '@nestjs/common';
// Modules
import { AccountModule, AccountTypeModule, CustomerModule, DepositModule, DocumentTypeModule, SecurityModule, TransferModule } from './modules';
// Controllers
import { AccountController, AccountTypeController, CustomerController, DepositController, DocumentTypeController, SecurityController, TransferController } from './controllers';
// Services
import { AccountService, AccountTypeService, CustomerService, DepositService, DocumentTypeService, SecurityService, TransferService } from './services';

@Module({
  imports: [SecurityModule, AccountModule, CustomerModule, TransferModule, DepositModule, AccountTypeModule, DocumentTypeModule],
  controllers: [SecurityController, AccountController, CustomerController, TransferController, DepositController, AccountTypeController, DocumentTypeController],
  providers: [SecurityService, AccountService, CustomerService, TransferService, DepositService, AccountTypeService, DocumentTypeService],
})
export class AppModule {}
