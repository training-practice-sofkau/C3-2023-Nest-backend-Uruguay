import { Module } from '@nestjs/common';
import { AccountService } from './service';
import { AccountController } from './account.controller';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule {

}
