import { Module } from '@nestjs/common';
import { AccountService } from './service';
import { AccountController } from './controller/account.controller';
import { AccountRepository, AccountTypeRepository } from './repositories';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [AccountService,AccountRepository,AccountTypeRepository]

})
export class AccountModule {}

