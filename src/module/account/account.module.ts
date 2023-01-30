import { Module } from '@nestjs/common';
import { AccountService } from './service';
import { AccountController } from './account.controller';
import { AccountRepository, AccountTypeRepository } from './Account.Repositories';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [AccountService,AccountRepository,AccountTypeRepository]
})
export class AccountModule {

}
