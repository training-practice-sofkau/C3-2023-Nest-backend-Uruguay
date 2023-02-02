import { Module } from '@nestjs/common';
import { CusotmerModule } from './customer';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';
import { DepositModule } from './deposit/deposit.module';
import { SegurityModule } from './Modules.Persistencia';


@Module({
  imports: [AccountModule,TransferModule,DepositModule,CusotmerModule,SegurityModule]
})
export class ModuleModule {}
