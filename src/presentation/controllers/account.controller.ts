import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AccountService } from '../../business/services';
import { BalanceDto, ChangeAccountDto, ChangeStateDto, CreateAccountDto } from '../../business/dtos';
import { ApiTags } from '@nestjs/swagger';
import { AccountEntity, AccountTypeEntity } from '../../data/persistence';
import { PaginationDto } from '../../business/dtos/pagination.dto';
import { UpdateAccountDto } from '../../business/dtos/update-account.dto';

@ApiTags('account')
@Controller('api/account')
export class AccountController {

    constructor(private readonly accountService: AccountService) {}

    @Post('/create')
    createAccount(@Body() account: CreateAccountDto): AccountEntity {
        return this.accountService.createAccount(account);
    }

    @Post('/update')
    updateAccount(@Body() account: UpdateAccountDto) {
        return this.accountService.updateAccount(account)
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
    changeState(@Body() account: ChangeStateDto): AccountEntity {
        return this.accountService.changeState(account);
    }

    @Get('/get-by-id')
    getAccountById(@Query('account') account: string): AccountEntity {
        return this.accountService.getAccountById(account);
    }

    @Get('/get-by-customer-id')
    getAccountByCostumerId(@Query('customer') customer: string): AccountEntity[] {
        return this.accountService.getAccountByCustomerId(customer);
    }

    @Get('/get-account-type-by-account-id')
    getAccountTypeById(@Query('account') account: string): AccountTypeEntity {
        return this.accountService.getAccountTypeById(account);
    }

    @Get('/get-account-type-by-id')
    getAccountTypeWithId(@Query('accountType') accountType: string): AccountTypeEntity {
        return this.accountService.getAccountTypeWithId(accountType);
    }

    @Post('/change-account-type')
    changeAccountType(@Body() accountType: ChangeAccountDto): AccountTypeEntity {
        return this.accountService.changeAccountType(accountType);
    }

    @Get('/delete')
    deleteAccount(@Query('account') account: string, @Query('soft') soft?: boolean): boolean {
        return this.accountService.deleteAccount(account, soft);
    }

    @Get('/get-soft-deleteds')
    findSoftDeletedAccounts(): AccountEntity[] {
        return this.accountService.findSoftDeletedAccounts();
    }

    @Get('/get-all')
    findAllAccounts(pagination?: PaginationDto): AccountEntity[] {
        return this.accountService.findAllAccounts(pagination);
    }

    @Get('/get-all-account-types')
    findAllAccountTypes(pagination?: PaginationDto): AccountTypeEntity[] {
        return this.accountService.findAllAccountTypes(pagination);
    }
}