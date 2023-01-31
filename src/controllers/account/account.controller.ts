import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AccountService } from '../../services/account/account.service';
import { CreateAccountDto } from '../../dtos/createAccount.dto';
import { AccountEntity } from '../../persistence/entities/account.entity';
import { ChangeAccountTypeDto } from '../../dtos/changeAccountType.dto';
import { AccountTypeEntity } from '../../persistence/entities/account-type.entity';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Post("create")
    createAccount(@Body() createAccount: CreateAccountDto): AccountEntity {
        return this.accountService.createAccount(createAccount)
    }

    @Post("getbalance")
    getBalance(@Body() accountId: string): number {
        return this.accountService.getBalance(accountId)
    }

    @Post("addbalance")
    addBalance(@Body() accountId: string, amount: number) {
        return this.accountService.addBalance(accountId, amount)
    }

    @Post("removebalance")
    removeBalance(@Body() accountId: string, amount: number) {
        return this.accountService.removeBalance(accountId, amount)
    }

    @Get("cantransfer")
    verifyAmountIntoBalance(@Body() accountId: string, amount: number) {
        return this.accountService.verifyAmountIntoBalance(accountId, amount)
    }

    @Get("isactive")
    getState(@Body() accountId: string) {
        return this.accountService.getState(accountId)
    }

    @Patch("changestate")
    changeState(@Body() accountId: string, state?: boolean) {
        this.accountService.changeState(accountId, state)
    }

    @Get("accounttype")
    getAccountType(@Body() accountId: string) {
        this.accountService.getAccountType(accountId)
    }

    @Patch("changeacctype")
    changeAccountType(@Body() account: ChangeAccountTypeDto): AccountTypeEntity {
        return this.accountService.changeAccountType(account)
    }

    @Patch("delete")
    deleteAccount(@Body() accountId: string) {
        this.accountService.deleteAccount(accountId)
    }
}
