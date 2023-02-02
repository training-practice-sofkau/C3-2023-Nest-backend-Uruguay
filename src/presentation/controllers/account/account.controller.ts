import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AccountService } from 'src/business/services';
import { PaginationModel } from 'src/data/models';
import { AccountEntity, AccountTypeEntity, CustomerEntity } from 'src/data/persistence';
import { AccountDTO, CreateAccountDTO } from 'src/business/dtos';
import { Logger } from '@nestjs/common/services';


@Controller('account')
export class AccountController {
    private logger = new Logger('AccountController');

    constructor(private readonly accountService: AccountService) {}

    @Post('/create-additional-checking-account')
    createAdditionalCheckingAccount(@Body() accountDTO: CreateAccountDTO): AccountEntity {

        this.accountService.accountObservable.subscribe(account => 
            this.logger.log(`New Saving Account added to Customer: ${account.customer.fullName}`))
        
            return this.accountService.createChekingAccount(accountDTO);
    }

    @Post('/create-additional-saving-account')
    createAdditionalSavingAccount(@Body() accountDTO: CreateAccountDTO): AccountEntity {

        this.accountService.accountObservable.subscribe(account => 
            this.logger.log(`New Checking Account added to Customer: ${account.customer.fullName}`))
        
            return this.accountService.createSavingAccount(accountDTO);
    }

    @Put('/update/:accountId')
    updateAccount(@Param('accountId') accountId: string, @Body() newAccount: AccountDTO): AccountEntity {
        return this.accountService.updateAccount(accountId, newAccount);
    }

    @Delete('/soft-delete/:accountId')
    softDeleteAccount(@Param('accountId') accountId: string): void {
        this.accountService.deleteAccount(accountId, true);
    }

    @Delete('/hard-delete/:accountId')
    hardDeleteAccount(@Param('accountId') accountId: string): void {
        this.accountService.deleteAccount(accountId);
    }

    @Get('/account-type/find-all')
    findAllAccountTypes(pagination: PaginationModel): AccountTypeEntity[] {
        return this.accountService.findAllAccountTypes(pagination);
    }

    @Get('/account-type/:id')
    findAccoutType(@Param('id') id: string): AccountTypeEntity {
        return this.accountService.findAccountType(id);
    }

    @Get('/find-all')
    findAll(@Body() pagination: PaginationModel): AccountEntity[] {
        return this.accountService.findAll(pagination);
    }

    @Get('/find/:accountId')
    findOneById(@Param('accountId') accountId: string): AccountEntity {
        return this.accountService.findOneById(accountId);
    }

    @Get('/find-by-customer/:customerId')
    findByCustomer(@Body() pagination: PaginationModel, @Param('customerId') customerId: string): AccountEntity[] {
        return this.accountService.findByCustomer(customerId);
    }

    @Get('/balance/:accountId')
    getBalance(@Param('accountId') accountId: string): number {
        return this.accountService.getBalance(accountId);
    }

    @Get('/type/:accountId')
    getAccountType(@Param('accountId') accountId: string): AccountTypeEntity {
        return this.accountService.getAccountType(accountId);
    }
    
    @Get('/customer/:accountId')
    getCustomer(@Param('accountId') accountId: string): CustomerEntity {
        return this.accountService.getCustomer(accountId);
    }

    @Get('/state/:accountId')
    getState(@Param('accountId') accountId: string): boolean {
        return this.accountService.getState(accountId);
    }

    @Post('/add-balance/:accountId')
    addBalance(@Param('accountId') accountId: string, @Body() amount: AccountDTO) {
        this.accountService.addBalance(accountId, amount);
    }

    @Patch('/change-account-type/:accountId')
    changeAccountType(@Param('accountId') accountId: string): AccountTypeEntity {
        return this.accountService.changeAccountType(accountId);
    }

    @Patch('/change-state/:accountId')
    changeState(@Param('accountId') accountId: string) {
        this.accountService.changeState(accountId);
    }

    @Post('/remove-all-balance/:accountId')
    removeAllBalance(@Param('accountId') accountId: string): void {
        return this.accountService.cleanBalance(accountId);
    }

    @Post('/remove-balance/:accountId')
    removeBalance(@Param('accountId') accountId: string, @Body() newBalance: AccountDTO): void {
        return this.accountService.removeBalance(accountId, newBalance);
    }
}
