import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AccountService, CustomerService } from '../../business/services';
import { BalanceDto, ChangeAccountDto, ChangeStateDto, CreateAccountDto } from '../../business/dtos';
import { ApiTags } from '@nestjs/swagger';
import { AccountEntity, AccountTypeEntity } from '../../data/persistence';

@ApiTags('account')
@Controller('api/account')
export class AccountController {

    constructor(private readonly accountService: AccountService, private readonly customerService: CustomerService) {}

    @Post('/create-account')
    createAccount(@Body() account: CreateAccountDto) {
        const newAccount = new AccountEntity();
        const newAccountType = new AccountTypeEntity();
        newAccountType.name = account.accountTypeName;

        newAccount.accountType = newAccountType;
        newAccount.balance = account.balance;
        newAccount.customer = this.customerService.getCustomerInfo(newAccount.id);
        const newAccountFinal = this.accountService.createAccount(newAccount);
        return newAccountFinal;
    }

    @Get('/get-balance')
    getBalance(@Query('account') account: string): string {
        return this.accountService.getBalance(account).toString();
    }
    
    @Post('/add-balance')
    addBalance(@Body() balance: BalanceDto): string {
        this.accountService.addBalance(balance);
        return 'ready';
    }

    @Post('/remove-balance')
    removeBalance(@Body() balance: BalanceDto): string {
        this.accountService.removeBalance(balance);
        return 'ready';
    }

    @Post('/verify-amount-into-balance')
    verifyAmountIntoBalance(@Body() balance: BalanceDto): string {
        return this.accountService.verifyAmountIntoBalance(balance).toString();
    }

    @Post('/get-state')
    getState(@Body() account: string): string {
        return this.accountService.getState(account).toString();
    }

    @Post('/change-state')
    changeState(@Body() account: ChangeStateDto): string {
        this.accountService.changeState(account);
        return 'ready';
    }

    @Post('/get-account-by-id')
    getAccountById(@Body() account: string): string {
        return this.accountService.getAccountById(account).toString();
    }

    @Post()
    getAccountType(@Body() account: string): string {
        return this.accountService.getAccountType(account).toString();
    }

    @Post()
    changeAccountType(@Body() account: ChangeAccountDto): string {
        return this.accountService.changeAccountType(account).toString();
    }

    @Post()
    deleteAccount(@Body() account: string): string {
        return 'Not implemented';
    }
}