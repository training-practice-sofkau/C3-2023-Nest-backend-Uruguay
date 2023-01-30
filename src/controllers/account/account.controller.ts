import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AccountService } from '../../services/account/';
import { AccountDTO, CreateAccountDTO } from '../../dtos/';
import { PaginationModel } from 'src/models';
import { CustomerEntity, AccountTypeEntity, AccountEntity} from '../../persistence/entities/';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('/create')
    createAccount(@Body() account: CreateAccountDTO): AccountEntity {
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

    @Get('/find-all')
    findAll(@Body() pagination: PaginationModel): AccountEntity[] {
        return this.accountService.findAll(pagination);
    }

    @Get('/find/:accountId')
    findOneById(@Param() accountId: string): AccountEntity {
        return this.accountService.findOneById(accountId);
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

    @Get('/customer/:accountId')
    getCustomer(@Param() accountId: string): CustomerEntity {
        return this.accountService.getCustomer(accountId);
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
        return this.accountService.removeBalance(accountId, 0, true);
    }

    @Post('/remove-balance/:accountId')
    removeBalance(@Param() accountId: string, @Body() amount: number): void {
        return this.accountService.removeBalance(accountId, amount);
    }
}
