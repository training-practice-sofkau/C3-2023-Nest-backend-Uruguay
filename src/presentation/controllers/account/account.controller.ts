import { Controller, Post, Body, Get, Param, Put, ParseUUIDPipe } from '@nestjs/common';
import { AccountDtos } from 'src/business';
import { AccountEntity, AccountTypeEntity } from 'src/Data';
import { AccountService } from 'src/business';
import { baseDto } from 'src/business/dtos/amountDtos';
import { ObservableHandler } from 'src/business/ob/observableHandler';
import { NewaccountDto } from '../../../business/dtos/newAccountDto';

@Controller('account')
export class AccountController extends ObservableHandler {
  constructor(private readonly AccountService: AccountService) {
    super();
  }


  @Post('newAccount')
  createAccount(@Body() account: NewaccountDto): AccountEntity {
const newAccount = this.AccountService.registerNewAccountType(account)

    this.handle(account).subscribe(value => {
      console.log(`Nueva cuenta creada: ${ JSON.stringify (account)}`)
    })
    return newAccount
  }
  @Get('getBalance/:id')
  getBalance(@Param('id' , ParseUUIDPipe )accountId: string): number {
    
    return this.AccountService.getBalance(accountId)
  }
  @Post('AddBalance/:id')
  addBalance(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() addBalanceDto: baseDto
  ): void{
    
     this.AccountService.addBalance(accountId, addBalanceDto.amount )
  }

  @Post('removeBalance/:id')
  removeBalance(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() addBalanceDto: baseDto
  ): void{
    
     this.AccountService.removeBalance(accountId,addBalanceDto.amount )
  }

  @Get('verification/:id')
  verifyAmountIntoBalance(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() baseDto: baseDto
  ): boolean {
    
    return this.AccountService.verifyAmountIntoBalance(accountId, baseDto.amount)
  }



  
  @Put('changeState/:id')
  changeState(@Param('id', ParseUUIDPipe) accountId: string,
  @Body() baseDto: baseDto
): void {
    return this.AccountService.changeState(accountId, baseDto.state)
  }
 
  @Get('getAccountType/:id')
  getAccountType(@Param('id', ParseUUIDPipe) accountId: string): AccountTypeEntity{
  return this.AccountService.getAccountType(accountId)
}
@Put ('changeAccntType/:id') 
changeAccntType(@Param('id', ParseUUIDPipe) accountId: string): AccountTypeEntity { 
    return this.AccountService.changeAccntType(accountId);
}

@Put('delete/:id')
unsubscribe(@Param('id', ParseUUIDPipe) accountId: string): void{
  return this.AccountService.deleteAccount(accountId);
}
@Put('harddelete/:id')
hardelete(@Param('id', ParseUUIDPipe) accountId: string,
@Body() baseDto: baseDto
): void{
  return this.AccountService.deleteAccount(accountId, baseDto.soft);
}

@Get()
getAll(){
 return this.AccountService.findALl()
}
}
