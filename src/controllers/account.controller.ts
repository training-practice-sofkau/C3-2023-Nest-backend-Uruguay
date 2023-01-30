import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from '../services';
import { BalanceDto, ChangeAccountDto, ChangeStateDto, CreateAccountDto } from '../dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('api/account')
export class AccountController {

    constructor(private readonly accountService: AccountService) {}

    @Post()
    createAccount(@Body() account: CreateAccountDto): string {
        return this.accountService.createAccount(account).toString();
    }

    @Post()
    getBalance(@Body() account: string): string {
        return this.accountService.getBalance(account).toString();
      }
    
    @Post()
    addBalance(@Body() balance: BalanceDto): string {
        this.accountService.addBalance(balance);
        return 'ready';
    }

    @Post()
    removeBalance(@Body() balance: BalanceDto): string {
        this.accountService.removeBalance(balance);
        return 'ready';
    }

    @Post()
    verifyAmountIntoBalance(@Body() balance: BalanceDto): string {
        return this.accountService.verifyAmountIntoBalance(balance).toString();
    }

    @Post()
    getState(@Body() account: string): string {
        return this.accountService.getState(account).toString();
    }

    @Post()
    changeState(@Body() account: ChangeStateDto): string {
        this.accountService.changeState(account);
        return 'ready';
    }

    @Post()
    getAccountById(@Body() account: string): string {
        return this.accountService.getAccountById(account).toString();
    }

    @Post()
    getAccountType(@Body() account: string): string {
        return this.accountService.getAccountType(account).toString();
    }

    @Post()
    changeAccountType(@Body() account: ChangeAccountDto): string {
        return this.accountService.changeAccountType(account).toString();
    }

    @Post()
    deleteAccount(@Body() account: string): string {
        return 'Not implemented';
    }
}