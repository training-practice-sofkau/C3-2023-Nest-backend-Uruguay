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
        return this.accountService.addBalance(balance).toString();
    }

    @Post('/remove-balance')
    removeBalance(@Body() balance: BalanceDto): string {
        return this.accountService.removeBalance(balance).toString();
    }

    @Post('/verify-amount-into-balance')
    verifyAmountIntoBalance(@Body() balance: BalanceDto): string {
        return this.accountService.verifyAmountIntoBalance(balance).toString();
    }

    @Get('/get-state')
    getState(@Query('account') account: string): string {
        return this.accountService.getState(account).toString();
    }

    @Post('/change-state')
    changeState(@Body() account: ChangeStateDto): string {
        return this.accountService.changeState(account).toString();
    }

    @Get('/get-account-by-id')
    getAccountById(@Query('account') account: string): string {
        return this.accountService.getAccountById(account).toString();
    }

    @Get()
    getAccountTypeById(@Query('account') account: string): string {
        return this.accountService.getAccountTypeById(account).toString();
    }

    @Get()
    getAccountTypeWithId(@Query('accountType') accountType: string): string {
        return this.accountService.getAccountTypeWithId(accountType).toString();
    }

    @Post()
    changeAccountType(@Body() accountType: ChangeAccountDto): string {
        return this.accountService.changeAccountType(accountType).toString();
    }

    @Get()
    deleteAccount(@Query('account') account: string): string {
        return this.accountService.deleteAccount(account).toString();
    }
}