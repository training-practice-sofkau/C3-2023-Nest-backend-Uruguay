import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ChangeAccountTypeDto } from 'src/business/dtos/changeAccountType.dto';
import { AccountEntity, AccountTypeEntity } from 'src/data/persistence';
import { AccountService } from 'src/business/services';
import { CreateAccountTypeDto } from 'src/business/dtos/createAccountType.dto';
import { CreateAccountDto } from 'src/business/dtos/createAccount.dto';
import { ObservableHandel } from 'src/Patrones/Observable/ObservableHandle';

@Controller('account')
export class AccountController extends ObservableHandel {

    constructor(private readonly accountService: AccountService) {

        super();
    }

    //Un solo delete  ya que luego en 
    //repositorio en base al valor booleno
    //se sabe si es logico o fisico
    
    @Delete('delete/')
    deleteAccount(@Body()accountId: string,  sof?: boolean): void {
        this.accountService.deleteAccount(accountId, sof)
    }
    /*
        //Delete Logico
        @Delete('deleteSoft/:id/:sof')
        deleteAccountSoft(@Param('id') accountId: string, @Param('sof') sof?: boolean): void {
            this.accountService.deleteAccount(accountId);
        }
    
        //Delete fisico
        @Delete('deleteHard/:id')
        deleteAccountHard(@Param('id') accountId: string, @Param('sof') sof?: boolean): void {
            this.accountService.deleteAccount(accountId, sof)
        }
    */
    //Cambiar el tipo de cuenta de una cuenta
    @Put('changeAccountType/:accountAccType')
    AccountType(@Param('accountId') accountAccType: ChangeAccountTypeDto): AccountTypeEntity {

        return this.accountService.changeAccountType(accountAccType)
    }

    //Crear cuenta
    @Post('createAccount')
    createAccount(@Body() account: CreateAccountDto): AccountEntity {
        console.log(account.id)
        return this.accountService.createAccount(account);
    }

    @Put('updateAccount')
    updateAccount(@Body() account: CreateAccountDto): AccountEntity {
        console.log(account)
        return this.accountService.updateAccount(account);
    }

    //private logger = new Logger('AccountType')
    @Post('createAccountType')
    createAccountType(@Body() accountType: CreateAccountTypeDto): AccountTypeEntity {
        //return
        const NewAccountType = this.accountService.createAccountType(accountType);
        /*
        this.handle(NewAccountType).subscribe(type => {
            this.logger.log(`Account Type create:${type}`)
        })
*/
        return NewAccountType

    }
    //Devolver un objeto busqueda(balance) por id corroborar que haga eso
    @Get('getBalance/:id')
    getBalance(@Param('id') accountId: string): number {
        return this.accountService.getId(accountId).balance
    }

    //Agrega Balance
    @Post('addBalance')
    addBalance(@Body() accountId: string, amount: number): void {
        this.accountService.addBalance(accountId, amount)
    }

    //Resta Balance
    @Put('removeBalance')
    removeBalance(@Body() accountId: string, amount: number): void {
        this.accountService.removeBalance(accountId, amount)
        //throw new Error('This method is not implemented');
    }

    //Verificar que el valor de la cuenta sea mayor al monto
    @Get("verifyAmount")
    verifyAmountIntoBalance(@Body() accountId: string, amount: number): boolean {
        return this.accountService.verifyAmountIntoBalance(accountId, amount)
    }

    //Tipo de cuenta por Id
    @Get("getAccountType/:id")
    getAccountType(@Param('id') accountTypeId: string): AccountTypeEntity {
        let acct = new AccountTypeEntity;
        acct = this.accountService.getAccountTypeOneById(accountTypeId)

        return acct
    }

    @Get('getAccounts')
    getAccounts(): AccountEntity[] {
        return this.accountService.getAccountAll()
    }

    //Devuelve estado de una cuenta
    @Get('getAccountState/:id')
    getAccountState(@Param('id') accountId: string): boolean {
        return this.accountService.getState(accountId)
    }

    @Get('getAccountTypes')
    getAccountTypes(): AccountTypeEntity[] {
        return this.accountService.getAccountTypeAll()
    }

}