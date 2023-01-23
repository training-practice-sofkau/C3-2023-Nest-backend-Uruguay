import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';
import { DepositModule } from './deposit/deposit.module';
import { CusotmerModule } from './cusotmer/cusotmer.module';

@Module({
  imports: [AccountModule, TransferModule, DepositModule, CusotmerModule]
})
export class ModuleModule {}
