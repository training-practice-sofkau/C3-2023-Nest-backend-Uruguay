import { Module } from '@nestjs/common';
import { TransferModule } from './transfer';
import { DepositModule } from './deposit';
import { CusotmerModule } from './customer';
import { AccountModule } from './account/account.module';


@Module({
  imports: [AccountModule,TransferModule,DepositModule,CusotmerModule]
})
export class ModuleModule {}
