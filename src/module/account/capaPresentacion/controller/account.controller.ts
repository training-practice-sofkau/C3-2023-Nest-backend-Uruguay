import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from '../../capaLogicaDeNegocio/service/account.service'; 
import { AccountEntity } from '../../capaDeDato/entity/account.entities';
import { AccountTypeEntity } from '../../capaDeDato/entity';
import { AccountTypeDto } from '../../capaLogicaDeNegocio/dto/accountType.dto';
import { PaginationModel } from 'src/module/base/models';
import { AccountDTO, CreateAccountdto } from '../../capaLogicaDeNegocio/dto';
import { CustomerEntity } from 'src/module/customer/capaDeDato/entity';
// import { ObservableHandel } from 'src/obs/observableHandler';

@Controller('account')
export class AccountController {//extends ObservableHandel
    constructor(private readonly accountService : AccountService){
       // super();
    }
    
   // private logger = new Logger(`AccountController`);

    //Modo prueba ya que no anda SigUp para crear una cuenta
    @Post(`/create`)//HECHO
    createAccount(@Body() newAccount : CreateAccountdto):AccountEntity{
        const newAccountType = this.accountService.createAccount(newAccount);
        return newAccountType;
    }
    @Get('/find-all')
    findAll(@Body() pagination: PaginationModel): AccountEntity[] {
        return this.accountService.findAll(pagination);
    }

    @Post(`/account-type/create`)//HECHO
    createAccountType(@Body() newAccount : AccountTypeDto):AccountTypeEntity{
        const newAccountType = this.accountService.createAccountType(newAccount);
        // this.handle(newAccountType).subscribe(type => {
        //     this.logger.log(`Tipo de cuenta creada : ${type}`)
        // });
        return newAccountType;
    }
    
    @Get('/customer/:customerId')//Me retorna todas las cuentas o un rango de cuentas del cliente
    findByCustomer(@Body() pagination: PaginationModel, @Param('customerId') customerId: string): AccountEntity[] {
        return this.accountService.findByCustomer(customerId);
    }

    @Get('/customer/:accountId')
    getCustomer(@Param('accountId') accountId: string): CustomerEntity {
        return this.accountService.getCustomer(accountId);
    }

    @Get('/account-type/find-all')//HECHO
    findAllAccountTypes(): AccountTypeEntity[] {
        return this.accountService.findAllAccountTypes();
    }
    
    @Put('/update/:accountId')//No anda
    updateAccount(@Param('accountId') accountId: string, @Body() newAccount: AccountDTO): AccountEntity {
        return this.accountService.updateAccount(accountId, newAccount);
    }

    
    @Delete('/softDelete/:accountId')
    softDeleteAccount(@Param('accountId') accountId: string): void {
        this.accountService.deleteAccount(accountId, true);
    }

    @Delete('/hardDelete/:accountId')
    hardDeleteAccount(@Param('accountId') accountId: string): void {
        this.accountService.deleteAccount(accountId);
    }

    @Put(`/changeAccountType/:accountId`)
    changeAccountType(@Param(`accountId`)accountId: string,
        @Body()accountTypeId: AccountDTO,): AccountTypeEntity {
            return this.accountService.changeAccountType(accountId,accountTypeId);
        }

    @Get(`/getAccountType/:id`) //HECHO
    getAccountType(@Param(`id`)accountId: string): AccountTypeEntity {
        return this.accountService.getAccountType(accountId);
    }
    @Get(`/getAccount/:id`) //HECHO
    getAccount(@Param(`id`)accountId: string): AccountEntity {
        return this.accountService.getById(accountId);
    }

    @Put(`/modificarState/:id/:state`)
    changeState(@Param(`id`) accountId: string,
     @Param(`state`) state: boolean): void {
        return this.accountService.changeState(accountId,state);
    }

    @Get(`/verifyAmount/:id/:amount`)
    verifyAmountIntoBalance(@Param(`id`)accountId: string,
    @Param(`amount`) amount: number): boolean{
        return this.accountService.verifyAmountIntoBalance(accountId,amount);
    }

    @Post('/remove-all-balance/:accountId')
    removeAllBalance(@Param('accountId') accountId: string): void {
        return this.accountService.removeBalanceAll(accountId);
    }

    @Delete(`/delete-balance/:id/:amoun`)
    removeBalance(@Param(`id`)accountId: string,@Param(`amoun`) amount: number): void {
        return this.accountService.removeBalance(accountId,amount);
    }

    @Post(`/addBalance/:id`)
    addBalance(@Param(`id`)accountId: string,@Body() amount: AccountDTO): void{
        return this.accountService.addBalance(accountId,amount);
    }

    @Get(`/state/:id`)
    getState(@Param(`id`) accountId: string): boolean{
        return this.accountService.getState(accountId);
    }

    @Get(`/Balance/:id`)
    getBalance(@Param(`id`) accountId: string):number{
        return this.accountService.getBalance(accountId);
    }
    


}
