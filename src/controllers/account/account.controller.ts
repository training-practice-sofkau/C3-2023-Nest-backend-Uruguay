import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { AccountTypeDto } from 'src/dtos/accountType.dto';
import { AccountService } from 'src/services';


@Controller('account')
export class AccountController {

    constructor(private readonly accountService: AccountService) { }

    @Delete('deleteSoft/:id/:sof')
    deleteAccountSoft(@Param('id') accountId: string, @Param('sof') sof?: boolean): void {
        this.accountService.deleteAccount(accountId);
           
    }

    @Delete('deleteHard/:id')
    deleteAccountHard(@Param('id') accountId: string, @Param('sof') sof?: boolean): void {
        this.accountService.deleteAccount(accountId, sof)
    }

    @Put('changeAccountType/:accountId/:accountTypeId')
    AccountType(@Param('accountId') accountId: AccountTypeDto,
        @Param('accountTypeId') accountTypeId: string,) AccountTypeEntity{
    return this.accountService.changeAccountType(accountId, accountTypeId)
}


}