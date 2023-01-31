import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from '../../business/services';
import { BalanceDto, ChangeAccountDto, ChangeStateDto, CreateAccountDto } from '../../business/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('api/account')
export class AccountController {

    constructor(private readonly accountService: AccountService) {}

    @Post('/create-account')
    createAccount(@Body() account: CreateAccountDto): string {
        return this.accountService.createAccount(account).toString();
    }

    @Post('/get-balance')
    getBalance(@Body() account: string): string {
        return this.accountService.getBalance(account).toString();
      }
    
    @Post('/add-balance')
    addBalance(@Body() balance: BalanceDto): string {
        this.accountService.addBalance(balance);
        return 'ready';
    }

    @Post('/remove-balance')
    removeBalance(@Body() balance: BalanceDto): string {
        this.accountService.removeBalance(balance);
        return 'ready';
    }

    @Post('/verify-amount-into-balance')
    verifyAmountIntoBalance(@Body() balance: BalanceDto): string {
        return this.accountService.verifyAmountIntoBalance(balance).toString();
    }

    @Post('/get-state')
    getState(@Body() account: string): string {
        return this.accountService.getState(account).toString();
    }

    @Post('/change-state')
    changeState(@Body() account: ChangeStateDto): string {
        this.accountService.changeState(account);
        return 'ready';
    }

    @Post('/get-account-by-id')
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