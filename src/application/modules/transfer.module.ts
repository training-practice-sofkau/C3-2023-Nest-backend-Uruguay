import { Module, forwardRef } from '@nestjs/common';
import { TransferController } from '../../presentation/controllers';
import { TransferService } from '../../business/services';
import { TransferRepository } from '../../data/persistence';
import { AccountModule, CustomerModule } from '.';

@Module({
  imports: [forwardRef( () => AccountModule), forwardRef( () => CustomerModule)],
  controllers: [TransferController],
  providers: [TransferService, TransferRepository],
})
export class TransferModule {}
