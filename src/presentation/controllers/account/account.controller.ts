import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';

//import { AccountService } from './business/services';
import { AccountEntity } from 'src/data/persistence/entities';
import { CreateAccountDto, UpdateAccountDto, AccountTransactionDto } from 'src/business/dtos';
import { AccountService } from 'src/business/services';
import { query } from 'express';
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
