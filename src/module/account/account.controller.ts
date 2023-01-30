import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from './service/account.service';
import { CreateAccountdto } from './dto/create-account.dto';
import { AccountEntity } from './account.entities';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService : AccountService ){}

    @Post()
    createAccount(@Body() newAccount : CreateAccountdto):AccountEntity{
        return this.accountService.createAccount(newAccount);
    }
    


}
