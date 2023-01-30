import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { AccountDtos } from 'src/dtos/accountDtos';
import { AccountEntity, AccountTypeEntity } from 'src/persistence';
import { AccountService } from '../../services/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}


  @Post('newAccount')
  createAccount(@Body() account: AccountDtos): AccountEntity {
    
    return this.AccountService.createAccount(account)
  }
  @Get('getBalance/:id')
  getBalance(@Param('id' )accountId: string): number {
    
    return this.AccountService.getBalance(accountId)
  }
  @Post('AddBalance/:id')
  addBalance(@Body()@Param('id') accountId: string, amount: number): void{
    
    return this.AccountService.addBalance(accountId,amount )
  }

  @Post('removeBalance/:id')
  removeBalance(@Body()@Param('id') accountId: string, amount: number): void{
    
    return this.AccountService.removeBalance(accountId,amount )
  }

  @Get('verification/:id')
  verifyAmountIntoBalance(@Param('id')id: string, amount: number): boolean {
    
    return this.AccountService.verifyAmountIntoBalance(id, amount)
  }

  @Put('changeState/:id')
  changeState(@Body()@Param('id') id: string, state: boolean): void {
    return this.AccountService.changeState(id, state)
  }
 
  @Get('getAccountType/:id')
  getAccountType(@Param('id') accountId: string): AccountTypeEntity{
  return this.AccountService.getAccountType(accountId)
}
@Put ('changeAccntType/:id') 
changeAccntType(@Body()@Param('id') accountId: string, accountTypeId: string): AccountTypeEntity { 
    return this.AccountService.changeAccntType(accountId, accountTypeId);
}

@Put('delete/:id')
unsubscribe(@Param('id') accountId: string): void{
  return this.AccountService.deleteAccount(accountId);
}
@Put('harddelete/:id')
hardelete(@Param('id') accountId: string, soft: boolean): void{
  return this.AccountService.deleteAccount(accountId, soft);
}}
