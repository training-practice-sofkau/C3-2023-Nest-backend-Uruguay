import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AccountService } from '../../business/services';
import { BalanceDto, ChangeAccountDto, ChangeStateDto, CreateAccountDto } from '../../business/dtos';
import { ApiTags } from '@nestjs/swagger';
import { AccountEntity, AccountTypeEntity } from '../../data/persistence';

@ApiTags('account')
@Controller('api/account')
export class AccountController {

    constructor(private readonly accountService: AccountService) {}

    @Post('/create-account')
    createAccount(@Body() account: CreateAccountDto): AccountEntity {
        return this.accountService.createAccount(account);
    }

    @Get('/get-balance')
    getBalance(@Query('account') account: string): string {
        return this.accountService.getBalance(account).toString();
    }
    
    @Post('/add-balance')
    addBalance(@Body() balance: BalanceDto): boolean {
        return this.accountService.addBalance(balance);
    }

    @Post('/remove-balance')
    removeBalance(@Body() balance: BalanceDto): boolean {
        return this.accountService.removeBalance(balance);
    }

    @Post('/verify-amount-into-balance')
    verifyAmountIntoBalance(@Body() balance: BalanceDto): boolean {
        return this.accountService.verifyAmountIntoBalance(balance);
    }

    @Get('/get-state')
    getState(@Query('account') account: string): boolean {
        return this.accountService.getState(account);
    }

    @Post('/change-state')
    changeState(@Body() account: ChangeStateDto): string {
        return this.accountService.changeState(account).toString();
    }

    @Get('/get-account-by-id')
    getAccountById(@Query('account') account: string): AccountEntity {
        return this.accountService.getAccountById(account);
    }

    @Get('/get-account-by-customer-id')
    getAccountByCostumerId(@Query('customer') customer: string): AccountEntity[] {
        return this.accountService.getAccountByCustomerId(customer);
    }

    @Get('/get-account-type-by-id')
    getAccountTypeById(@Query('account') account: string): AccountTypeEntity {
        return this.accountService.getAccountTypeById(account);
    }

    @Get('/get-account-type-with-id')
    getAccountTypeWithId(@Query('accountType') accountType: string): AccountTypeEntity {
        return this.accountService.getAccountTypeWithId(accountType);
    }

    @Post('/change-account-type')
    changeAccountType(@Body() accountType: ChangeAccountDto): AccountTypeEntity {
        return this.accountService.changeAccountType(accountType);
    }

    @Get('/delete-account')
    deleteAccount(@Query('account') account: string, @Query('soft') soft?: boolean): boolean {
        return this.accountService.deleteAccount(account, soft);
    }
}