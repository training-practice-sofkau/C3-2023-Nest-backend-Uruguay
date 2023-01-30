import { Body, Controller, Param, Post, Put, Get, Delete } from '@nestjs/common';
import { AccountDto } from 'src/dtos/account-dto';
import { CustomerDto } from 'src/dtos/create-customer-dto';
import { AccountEntity } from 'src/persistence/entities/account-entity';
import { CustomerEntity } from 'src/persistence/entities/customer-entity';
import { AccountService } from 'src/services/account/account.service';
import { CustomerService } from 'src/services/customer/customer.service';

@Controller('account')
export class AccountController {

    constructor(private readonly accountService : AccountService ){}
    
    @Post('register')
    createAccount (@Body() account : AccountDto) : AccountEntity{
        return this.accountService.createAccount(account);
    }
    

    @Put('update/:id')
    async updateAccount(@Param('id') accountId: string, @Body() newDetails: AccountDto): Promise<AccountEntity>{
        return  this.accountService.updateAccount(accountId, newDetails);
    }   

    @Get('balance/:id')
    getBalance(@Param('id') accountId: string): number{
        
    return this.accountService.getBalance(accountId)
    }

    @Delete('/:id')
    async deleteAccount(@Param('id') accountId: string): Promise<void> {
        await this.accountService.deleteAccount(accountId);
    }


}    




