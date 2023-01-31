import { Module } from '@nestjs/common';

// Modules
import { SecurityModule, AccountModule, CustomerModule, DepositModule, TransferModule } from './application/modules';

@Module({
  imports: [SecurityModule, AccountModule, CustomerModule, DepositModule, TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
