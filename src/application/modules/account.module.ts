import { Module, forwardRef } from '@nestjs/common';
import { AccountController } from '../../presentation/controllers';
import { AccountService } from '../../business/services';
import { AccountRepository, AccountTypeRepository } from '../../data/persistence';
import { CustomerModule } from '.';

@Module({
  imports: [forwardRef( () => CustomerModule)],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, AccountTypeRepository],
  exports: [AccountService, AccountRepository, AccountTypeRepository],
})
export class AccountModule {}