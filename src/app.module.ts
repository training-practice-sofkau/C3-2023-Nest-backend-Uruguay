import { Module } from '@nestjs/common';
// Servicios
import { SecurityService } from './services/security/security.service';
import { AccountService } from './services/account/account.service';
import { CustomerService } from './services/customer/customer.service';
import { TransferService } from './services/transfer/transfer.service';
import { DepositService } from './services/deposit/deposit.service';
// Modulos
import { SecurityModule } from './modules/security/security.module';
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
// Controladores
import { SecurityController } from './controllers/security/security.controller';
import { AccountController } from './controllers/account/account.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';

@Module({
  imports: [SecurityModule, AccountModule, CustomerModule, DepositModule, TransferModule],
  controllers: [SecurityController, AccountController, CustomerController, DepositController, TransferController],
  providers: [SecurityService, AccountService, CustomerService, TransferService, DepositService],
})
export class AppModule {}
