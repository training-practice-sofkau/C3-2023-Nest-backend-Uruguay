import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from '../../services/account/account.service';
import { CreateAccountDto } from '../../dtos/createAccount.dto';
import { AccountEntity } from '../../persistence/entities/account.entity';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Post()
    createAccount(@Body() createAccount: CreateAccountDto): AccountEntity {
        return this.accountService.createAccount(createAccount)
    }
}
