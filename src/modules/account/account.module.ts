import { Module } from '@nestjs/common';
import { AccountController } from '../../controllers/account/account.controller';
import { AccountService } from '../../services/account/account.service';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountModule {}
