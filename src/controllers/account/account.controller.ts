import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { AccountService } from '../../services/account';
import { CreateAccountDto } from '../../dtos';
import { AccountEntity, AccountTypeEntity } from '../../persistence/entities';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Post('createAccount')
    createAccount(@Body() createAccount: CreateAccountDto): AccountEntity {
        return this.accountService.createAccount(createAccount);
    }

    @Get('getBalance/:id')
    getBalance(@Param('id')  accountId: string): number {
        return this.accountService.getBalance(accountId);
    }

    @Post('addBalance/:id')
    addBalance(@Body() @Param('id') accountId: string, amount: number): void {
        return this.accountService.addBalance(accountId, amount);
    }

    @Post('removeBalance/:id')
    removeBalance(@Body() @Param('id') accountId: string, amount: number): void {
        return this.accountService.removeBalance(accountId, amount);
    }

    @Get('verifyAmount/:id')
    verifyAmountIntoBalance(@Param('id') accountId: string, amount: number): boolean {
        return this.accountService.verifyAmountIntoBalance(accountId, amount);
    }

    @Get('getState/:id')
    getState(@Param('id') accountId: string): boolean {
        return this.accountService.getState(accountId);
    }

    @Put('changeState/:id')
    changeState(@Body() @Param('id') accountId: string, state: boolean): void{
        return this.accountService.changeState(accountId, state);
    }

    @Get('getAccountType/:id')
    getAccountType(@Param('id') accountId: string): AccountTypeEntity {
        return this.accountService.getAccountType(accountId);
    }

    @Put('changeAccountType/:id')
    changeAccountType(@Param('id') accountId: string, accountTypeId: string): AccountTypeEntity {
        return this.accountService.changeAccountType(accountId, accountTypeId);
    }

    @Delete('deleteAccount/:id')
    deleteAccount(@Param('id') accountId: string, soft?: boolean): void {
        return this.accountService.deleteAccount(accountId, soft);
    }
}
