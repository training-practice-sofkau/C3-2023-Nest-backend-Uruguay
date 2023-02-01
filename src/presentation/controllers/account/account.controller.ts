import { Body, UsePipes, Controller, Get, Post, Param, ParseUUIDPipe, ValidationPipe, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common';

import { AccountService } from '../../../business/services';
import { AccountDto } from '../../../business/dtos';
import { AccountEntity } from '../../../data/persistence/entities';
import { ParseBoolPipe } from '@nestjs/common/pipes';
import { AccountTypeEntity } from '../../../data/persistence/entities/account-type.entity';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    findAll(): AccountDto[] {
        return this.accountService.findAllAccounts();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    findOneAccountById(@Param('id',ParseUUIDPipe) id: string ): AccountDto {
        return this.accountService.findOneAccountById(id);
    }

    @Get(':id/balance')
    @UsePipes(new ValidationPipe())
    getBalance(@Param('id',ParseUUIDPipe) id: string ): number {
        return this.accountService.getBalance(id);
    }

    @Post(':id/balance/:amount')
    @UsePipes(new ValidationPipe())
    addBalance(
        @Param('id',ParseUUIDPipe) id: string,
        @Param('amount',ParseIntPipe) amount: number
        ): void {
        this.accountService.addBalance(id, amount);
    }

    @Delete(':id/balance/:amount')
    @UsePipes(new ValidationPipe())
    removeBalance(
        @Param('id',ParseUUIDPipe) id: string,
        @Param('amount',ParseIntPipe) amount: number
        ): void {
        this.accountService.removeBalance(id, amount);
    }

    @Get(':id/balance/verify/:amount')
    @UsePipes(new ValidationPipe())
    verifyAmountIntoBalance(
        @Param('id',ParseUUIDPipe) id: string,
        @Param('amount',ParseIntPipe) amount: number
        ): boolean {
        return this.accountService.verifyAmountIntoBalance(id, amount);
    }

    @Get(':id/state')
    @UsePipes(new ValidationPipe())
    getState(@Param('id',ParseUUIDPipe) id: string ): boolean {
        return this.accountService.getState(id);
    }

    @Patch(':id/state/:bool')
    @UsePipes(new ValidationPipe())
    changeState(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('bool', ParseBoolPipe) bool: boolean ): void {
        return this.accountService.changeState(id, bool);
    }

    @Get(':id/type')
    @UsePipes(new ValidationPipe())
    getAccountType(@Param('id',ParseUUIDPipe) id: string ): AccountTypeEntity {
        return this.accountService.getAccountType(id);
    }

    @Patch(':id/type/:typeid')
    @UsePipes(new ValidationPipe())
    changeAccountType(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('typeid', ParseUUIDPipe) typeId: string ): AccountTypeEntity {
        return this.accountService.changeAccountType(id, typeId);
    }


    @Post()
    @UsePipes(new ValidationPipe())
    createAccount(@Body() account: AccountDto): AccountEntity {
        return this.accountService.createAccount(account);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateAccount(@Param('id', ParseUUIDPipe) id: string ,@Body() account: AccountDto): AccountEntity {
        return this.accountService.updatedAccount(id, account);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateSomePropertiesAccount(@Param('id', ParseUUIDPipe) id: string ,@Body() account: AccountDto): AccountEntity {
        return this.accountService.updatedAccount(id, account);
    }


    @Delete(':id')
    @UsePipes(new ValidationPipe())
    hardDeleteAccount(@Param('id', ParseUUIDPipe) id: string): void {
        this.accountService.deleteAccount(id);
    }
}
