import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { AccountService } from '../../services';
import { AccountModel } from '../../models';
import { AccountEntity } from '../../persistence/entities';

@Controller('account')
export class AccountController {

    constructor( private accountService: AccountService) {}


    //TODO: Implment checks and controls - Verify user token


    // new account
    // TODO: implement newAccountDTO to use instead of accountModel
    @Post('register')
    async createAccount(@Body() account: AccountModel): Promise<AccountEntity>{

        return await this.accountService.createAccount(account);
    }

    //update account
    // TODO: implement accountUpdateDTO instead of accountModel
    @Put('update/:id')
    async updateAccount(@Param('id') accountId: string, 
                        @Body() newDetails: AccountModel): 
                        Promise<AccountEntity>{
    
        return await this.accountService.updateAccount(accountId, newDetails);
    }    

    // delete account ( Only soft delete from here )
    @Delete('/:id')
    async deleteAccount(@Param('id') accountId: string): Promise<void> {
        await this.accountService.deleteAccount(accountId);
    }

    // get account balance
    @Get('/:id')
    async getBalance(@Param('id') accountId: string): Promise<number>{
        
        return await this.accountService.getBalance(accountId);        
    }

    // add amount to balance ( )
    @Post('addBalance/:id')
    async addBalance(@Param('id') accountId: string, 
                     @Body() amount: number): 
                     Promise<void>{

        await this.accountService.addBalance(accountId, amount);
    }

    // remove amount to balance
    @Post('removeBalance/:id')
    async removeBalance(@Param('id') accountId: string, 
                     @Body() amount: number): 
                     Promise<void>{

        await this.accountService.removeBalance(accountId, amount);
    }
}
