import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SignUpDto } from 'src/dtos/sign-up.dto';
import { AccountService } from '../../../.vscode/account.service';

@Controller('account')
export class AccountController {

    constructor(private readonly accountService: AccountService) { }

    @Delete('deleteSoft/:id/:sof')
    deleteAccountSoft(@Param('id') accountId: string, @Param('sof') sof?:boolean): void{
        return sof? this.accountService.deleteAccount(accountId,sof): this.accountService.deleteAccount(accountId);
    }

}
