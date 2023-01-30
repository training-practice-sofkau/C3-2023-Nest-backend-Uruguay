import { Body, UsePipes, Controller, Get, Post, Param, ParseUUIDPipe, ValidationPipe, Put, Patch, Delete } from '@nestjs/common';

import { AccountService } from '../../services';
import { AccountDto } from '../../dtos';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    findAll(): AccountDto[] {
        return this.accountService.findAllAccounts();
    }

    @Get(':id')
    findOneAccountById(@Param('id',ParseUUIDPipe) id: string ): AccountDto {
        return this.accountService.findOneAccountById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createAccount(@Body() account: AccountDto): AccountDto {
        return this.accountService.createAccount(account);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateAccount(@Param('id', ParseUUIDPipe) id: string ,@Body() account: AccountDto): AccountDto {
        return this.accountService.updatedAccount(id, account);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateSomePropertiesAccount(@Param('id', ParseUUIDPipe) id: string ,@Body() account: AccountDto): AccountDto {
        return this.accountService.updatedAccount(id, account);
    }


    @Delete(':id')
    hardDeleteAccount(@Param('id', ParseUUIDPipe) id: string): void {
        this.accountService.deleteAccount(id);
    }
}
