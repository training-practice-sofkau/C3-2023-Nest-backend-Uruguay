import { Body, Controller, Param, Post, Put, Get, Delete,Patch } from '@nestjs/common';
import { AccountDTO } from 'src/dtos/account-dto';
import { CreateAccountDto } from 'src/dtos/create-account-dto';
import { PaginationModel } from 'src/models/i-pagination-model';
import { AccountEntity } from 'src/persistence/entities/account-entity';
import { AccountTypeEntity } from 'src/persistence/entities/account-type-entity';
import { CustomerEntity } from 'src/persistence/entities/customer-entity';
import { AccountService } from 'src/services/account/account.service';
import { CustomerService } from 'src/services/customer/customer.service';

@Controller('account')
export class AccountController {

    constructor(private readonly accountService : AccountService ){}
    
    @Post('/create')
    createAccount(@Body() account: CreateAccountDto): AccountEntity {
        return this.accountService.createAccount(account);
    }

    @Put('/update/:accountId')
    updateAccount(@Param() accountId: string, @Body() newAccount: AccountDTO): AccountEntity {
        return this.accountService.updateAccount(accountId, newAccount);
    }

    @Delete('/soft-delete/:accountId')
    softDeleteAccount(@Param() accountId: string): void {
        this.accountService.deleteAccount(accountId, true);
    }

    @Delete('/hard-delete/:accountId')
    hardDeleteAccount(@Param() accountId: string): void {
        this.accountService.deleteAccount(accountId);
    }

    @Get('/find-by-customer/:customerId')
    findByCustomer(@Body() pagination: PaginationModel, @Param() customerId: string): AccountEntity[] {
        return this.findByCustomer(pagination, customerId);
    }

    @Get('/balance/:accountId')
    getBalance(@Param() accountId: string): number {
        return this.accountService.getBalance(accountId);
    }

    @Get('/account-type/:accountId')
    getAccountType(@Param() accountId: string): AccountTypeEntity {
        return this.accountService.getAccountType(accountId);
    }


    @Get('/state/:accountId')
    getState(@Param() accountId: string): boolean {
        return this.accountService.getState(accountId);
    }

    @Post('/add-balance/:accountId')
    addBalance(@Param() accountId: string, @Body() amount: number) {
        this.accountService.addBalance(accountId, amount);
    }

    @Patch('/change-account-type/:accountId')
    changeAccountType(@Param() accountId: string,@Body() accountTypeId: string): AccountEntity {
        return this.changeAccountType(accountId, accountTypeId);
    }

    @Patch('/change-state/:accountId')
    changeState(accountId: string, state: boolean) {
        this.accountService.changeState(accountId, state);
    }

    @Post('/remove-all-balance/:accountId')
    removeAllBalance(@Param() accountId: string): void {
        return this.accountService.removeBalance(accountId, 0);
    }

    @Post('/remove-balance/:accountId')
    removeBalance(@Param() accountId: string, @Body() amount: number): void {
        return this.accountService.removeBalance(accountId, amount);
    }

}    




