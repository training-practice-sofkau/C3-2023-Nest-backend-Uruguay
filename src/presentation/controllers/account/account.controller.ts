import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { AccountService } from '../../services/account';
import { CreateAccountDto } from '../../business/dtos';
import { AccountEntity, AccountTypeEntity } from '../../persistence/entities';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Post('createAccount')
    createAccount(@Body() createAccount: CreateAccountDto): AccountEntity {
        return this.accountService.createAccount(createAccount);
    }

    @Get('getBalance/:id')
    getBalance(@Param('id', ParseUUIDPipe)  accountId: string): number {
        return this.accountService.getBalance(accountId);
    }

    @Post('addBalance/:id')
    addBalance(@Param('id', ParseUUIDPipe) accountId: string,@Body()  amount: number): void {
        return this.accountService.addBalance(accountId, amount);
    }

    @Post('removeBalance/:id')
    removeBalance(@Param('id', ParseUUIDPipe) accountId: string,@Body()  amount: number): void {
        return this.accountService.removeBalance(accountId, amount);
    }

    @Get('verifyAmount/:id')
    verifyAmountIntoBalance(@Param('id', ParseUUIDPipe) accountId: string, amount: number): boolean {
        return this.accountService.verifyAmountIntoBalance(accountId, amount);
    }

    @Get('getState/:id')
    getState(@Param('id', ParseUUIDPipe) accountId: string): boolean {
        return this.accountService.getState(accountId);
    }

    @Put('changeState/:id')
    changeState(@Body() @Param('id', ParseUUIDPipe) accountId: string,@Query('state', ParseBoolPipe) state: boolean): void{
        return this.accountService.changeState(accountId, state);
    }

    @Get('getAccountType/:id')
    getAccountType(@Param('id', ParseUUIDPipe) accountId: string): AccountTypeEntity {
        return this.accountService.getAccountType(accountId);
    }

    @Put('changeAccountType/:id')
    changeAccountType(@Param('id', ParseUUIDPipe) accountId: string,@Param('accountTypeId', ParseUUIDPipe) accountTypeId: string): AccountTypeEntity {
        return this.accountService.changeAccountType(accountId, accountTypeId);
    }

    @Delete('deleteAccount/:id')
    deleteAccount(@Param('id', ParseUUIDPipe) accountId: string,@Query('soft', ParseBoolPipe) soft?: boolean): void {
        return this.accountService.deleteAccount(accountId, soft);
    }
}
