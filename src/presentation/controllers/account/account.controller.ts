import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AccountService } from 'src/business/services';
import { PaginationModel } from 'src/data/models';
import { AccountEntity, AccountTypeEntity, CustomerEntity } from 'src/data/persistence';
import { AccountDTO, CreateAccountDTO } from 'src/business/dtos';
import { TypeDTO } from '../../../business/dtos/type.dto';


@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('/create-additional-account')
    createAdditionalAccount(@Body() accountDTO: CreateAccountDTO): AccountEntity {
        return this.accountService.createAccount(accountDTO);
    }

    @Post('/account-type/create')
    createAccountType(@Body() accountTypeDTO: TypeDTO): AccountTypeEntity {
        return this.accountService.createAccountType(accountTypeDTO);
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
    changeAccountType(@Param('accountId') accountId: string,@Body() accountTypeDTO: AccountDTO): AccountTypeEntity {
        return this.accountService.changeAccountType(accountId, accountTypeDTO);
    }

    @Patch('/change-state/:accountId')
    changeState(@Param('accountId') accountId: string,@Body() state: AccountDTO) {
        this.accountService.changeState(accountId, state);
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
