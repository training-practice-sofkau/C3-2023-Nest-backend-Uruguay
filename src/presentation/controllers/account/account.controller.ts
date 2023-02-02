import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';

import { AccountEntity } from 'src/data/persistence/entities';
import { CreateAccountDto, UpdateAccountDto, AccountTransactionDto, AccountDto } from 'src/business/dtos';
import { AccountService } from 'src/business/services';
import { ParseBoolPipe } from '@nestjs/common/pipes';



@Controller('account')
export class AccountController {

    constructor( private readonly accountService: AccountService) {}

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
    

                            console.log("controller")
                            
        return await this.accountService.updateAccount(accountId, newDetails);
    }    

    
    // delete account ( Only soft delete from here )
    @Delete('delete/:id')
    async deleteAccount(@Param('id', ParseUUIDPipe) accountId: string,
                        @Query('soft', ParseBoolPipe) soft?: boolean): Promise<void> {

        await this.accountService.deleteAccount(accountId, soft);
    }

    // show all accounts
    @Get()
    async getAll(): Promise<AccountEntity[]> {

        return await this.accountService.getAllAccounts();
    }

    // get account information
    @Get('/:id')
     getAccountData(@Param('id', ParseUUIDPipe) accountId: string): AccountDto{
        
        return  this.accountService.getAccountData(accountId);        
    }

    // get account balance
    @Get('balance/:id')
     getBalance(@Param('id', ParseUUIDPipe) accountId: string): number{
        
        return  this.accountService.getBalance(accountId);        
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
