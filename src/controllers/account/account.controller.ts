import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { constructor } from 'express';
import { AccountDto } from 'src/dtos/account-dto';
import { CustomerDto } from 'src/dtos/customer-dto';
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
    
    @Put(`update/:id`)
    async updatedCustomer(@Param(`id`) id : string,@Body() newCustomer : CustomerDto):CustomerEntity{
        return this.customerService.updatedCustomer(id,newCustomer);
    }


}




