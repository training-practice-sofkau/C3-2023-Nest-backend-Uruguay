import { Body, Controller, Post, Put } from '@nestjs/common';

import { AccountService } from '../../services';
import { AccountModel } from '../../models';
import { AccountEntity } from 'src/persistence/entities';

@Controller('account')
export class AccountController {

    constructor( private accountService: AccountService) {}

    //new account
    //TODO: implement newAccountDTO to use instead of accountModel
    @Post('register')
    async createAccount(@Body() account: AccountModel): Promise<AccountEntity>{

        return await this.accountService.createAccount(account);

    }

    //update account
    //TODO: implement accountUpdateDTO instead of accountModel
    @Put('update')
    async updateAccount(@Body() accountId: string, newDetails: AccountModel): Promise<AccountEntity>{
    
        return await this.accountService.updateAccount(accountId, newDetails);
    }
}
