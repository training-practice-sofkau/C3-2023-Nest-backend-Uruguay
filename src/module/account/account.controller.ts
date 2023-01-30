import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from './service/account.service';
import { CreateAccountdto } from './dto/create-account.dto';
import { AccountEntity } from './account.entities';
import { AccountTypeEntity } from './account.Type.Entity';
import { AccountDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService : AccountService ){}

    @Post(`crearCuenta`)
    createAccount(@Body() newAccount : CreateAccountdto):AccountEntity{
        return this.accountService.createAccount(newAccount);
    }
    
    @Put('/update/:accountId')
    updateAccount(@Param() accountId: string, @Body() newAccount: AccountDto): AccountEntity {
        return this.accountService.updateAccount(accountId, newAccount);
    }
    //Esto funciona? hay que usar 
    @Delete(`deleteSof/:id/:sof`)
    deleteAccountSof(@Param(`id`)accountId: string ,
    @Param(`sof`) sof? : boolean): void {
        //Evitar estas validaciones en el controller
        return sof?  this.accountService.deleteAccount(accountId,sof) : 
        this.accountService.deleteAccount(accountId);
    }
    
    @Delete(`deleteHard/:id`)
    deleteAccountHard(@Param(`id`)accountId: string ,
    @Param(`sof`) sof? : boolean): void {
        return this.accountService.deleteAccount(accountId);
    }

    @Put(`changeAccountType/:accountId/:accountTypeId`)
    changeAccountType(@Param(`accountId`)accountId: string,
        @Param(`accountTypeId`)accountTypeId: string,): AccountTypeEntity {
            return this.accountService.changeAccountType(accountId,accountTypeId);
        }

    @Get(`getAccountType/:id`)
    getAccountType(@Param(`id`)accountId: string): AccountEntity {
        return this.accountService.getAccountType(accountId);
    }


    @Put(`modificarState/:id/:state`)
    changeState(@Param(`id`) accountId: string,
     @Param(`state`) state: boolean): void {
        return this.accountService.changeState(accountId,state);
    }

    @Get(`verifyAmount/:id/:amount`)
    verifyAmountIntoBalance(@Param(`id`)accountId: string,
    @Param(`amount`) amount: number): boolean{
        return this.accountService.verifyAmountIntoBalance(accountId,amount);
    }

    
    @Delete(`deleteBalance/:id/:amount`)
    removeBalance(accountId: string, amount: number): void {
        return this.accountService.removeBalance(accountId,amount);
    }

    @Post(`addBalance/:id/:amount`)
    addBalance(@Param(`id`)accountId: string,@Param(`amount`) amount: number): void{
        return this.accountService.addBalance(accountId,amount);
    }



    @Get(`buscarPorEstado/:id`)
    getState(@Param(`id`) accountId: string): boolean{
        return this.accountService.getState(accountId);
    }

    @Get(`buscarPorBalance/:id`)
    getBalance(@Param(`id`) accountId: string):number{
        return this.accountService.getBalance(accountId);
    }
    


}
