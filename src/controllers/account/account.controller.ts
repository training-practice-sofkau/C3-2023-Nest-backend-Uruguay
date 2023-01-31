import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';

import { AccountService } from '../../services';
import { AccountEntity } from '../../persistence/entities';
import { CreateAccountDto, UpdateAccountDto, AccountTransactionDto } from '../../dtos';



@Controller('account')
export class AccountController {

    constructor( private readonly accountService: AccountService) {}


    //TODO: Implment checks and controls - Verify user token


    // new account DONE    
    @Post('create')
    async createAccount(@Body() account: CreateAccountDto): Promise<AccountEntity> {
        
        return await this.accountService.createAccount(account);
    }

    //update account DONE   
    @Put('update/:id')
    async updateAccount(@Param('id', ParseUUIDPipe) accountId: string, 
                        @Body() newDetails: UpdateAccountDto): 
                        Promise<AccountEntity>{
    
        return await this.accountService.updateAccount(accountId, newDetails);
    }    

    
    // delete account ( Only soft delete from here )
    @Delete('delete/:id')
    async deleteAccount(@Param('id', ParseUUIDPipe) accountId: string): Promise<void> {
        await this.accountService.deleteAccount(accountId);
    }

    // show all accounts
    @Get()
    async getAll(): Promise<AccountEntity[]> {

        return await this.accountService.getAllAccounts();
    }

    // get account balance
    @Get('/:id')
    async getBalance(@Param('id', ParseUUIDPipe) accountId: string): Promise<number>{
        
        return await this.accountService.getBalance(accountId);        
    }

    // add amount to balance ( )
    @Post('addBalance')
    async addBalance(@Body() transaction: AccountTransactionDto): Promise<void>{
                    
        await this.accountService.addBalance(transaction.accountId, transaction.amount);
    }

    // remove amount to balance
    @Post('removeBalance')
    async removeBalance(@Body() transaction: AccountTransactionDto): Promise<void>{

        await this.accountService.removeBalance(transaction.accountId, transaction.amount);
    }
}
