import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer';
import { DepositModule } from './deposit';
import { CusotmerModule } from './cusotmer';

@Module({
  imports: [AccountModule,TransferModule,DepositModule,CusotmerModule]
})
export class ModuleModule {}
