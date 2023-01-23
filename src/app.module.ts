import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { AccountController } from './module/account/account.controller';
import { TransfersController } from './controllers/transfers/transfers.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { AccountService } from './module/account/account.service';
import { CustomerService } from './services/customer/customer.service';
import { DepositService } from './services/deposit/deposit.service';
import { TransfersService } from './services/transfers/transfers.service';
import { AccountModule } from './module/account/account.module';
import { CustomerModule } from './module/customer/customer.module';
import { TransfersModule } from './module/transfers/transfers.module';
import { DepositModule } from './module/deposit/deposit.module';
import { SecurityModule } from './module/security/security.module';
import { DatabaseModule } from './database/database.module';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [AccountModule, CustomerModule, TransfersModule, DepositModule, SecurityModule, DatabaseModule, ModuleModule],
  controllers: [SecurityController, AccountController, TransfersController, CustomerController, DepositController],
  providers: [AccountService, CustomerService, DepositService, TransfersService],
})
export class AppModule {}
