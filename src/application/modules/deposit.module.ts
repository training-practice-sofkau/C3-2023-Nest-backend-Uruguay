import { Module, forwardRef } from '@nestjs/common';
import { DepositController } from '../../presentation/controllers';
import { DepositRepository } from '../../data/persistence';
import { DepositService } from '../../business/services';
import { CustomerModule } from '.';
import { AccountModule } from './account.module';

@Module({
  imports: [forwardRef( () => AccountModule), forwardRef( () => CustomerModule)],
  controllers: [DepositController],
  providers: [DepositService, DepositRepository],
})
export class DepositModule {}
