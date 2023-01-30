import { Injectable, NotAcceptableException } from '@nestjs/common';
import { AccountRepository, AccountTypeRepository } from '../Account.Repositories';
import { AccountEntity } from '../account.entities';
import { AccountTypeEntity } from '../account.Type.Entity';
import { CreateAccountdto } from '../dto/create-account.dto';

@Injectable()
export class AccountService {
constructor(
  private readonly accountRepository: AccountRepository,
  private readonly accountTypeRepository: AccountTypeRepository) {}

  createAccount(account: CreateAccountdto): AccountEntity {

    const accountType = new AccountTypeEntity();
    accountType.id = account.accountTypeId;


    const newAccount = new AccountEntity();
    newAccount.account_type_id = accountType;

    return this.accountRepository.register(newAccount);
  }

  getBalance(accountId: string):number{
    
    const accountEntity = this.accountRepository.findOneById(accountId); 

    return accountEntity.balance;
  }

  addBalance(accountId: string, amount: number): void {
    const account = this.accountRepository.findOneById(accountId);
    //validar el amount 
    account.balance += amount;
    this.accountRepository.update(accountId,account);
  }

  removeBalance(accountId: string, amount: number): void {
    const account = this.accountRepository.findOneById(accountId);

    if(this.verifyAmountIntoBalance(accountId,amount) === false) 
    throw new NotAcceptableException(`El monto : ${amount}
     es incorrecto , verifique que el monto ingresado no sea inferior a 0, o superior al  
     balance : ${account.balance}`); 

    account.balance -= amount;

    this.accountRepository.update(accountId,account);
  }

  
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    const account = this.accountRepository.findOneById(accountId);
    
    if(account.balance < amount  || account.balance == 0 || amount <0) return false;

    return true;
  }

  
  getState(accountId: string): boolean {
    const account = this.accountRepository.findOneById(accountId);
    return account.state;
  }

  
  changeState(accountId: string, state: boolean): void {
   const account = this.accountRepository.findOneById(accountId);
   account.state = state;

   this.accountRepository.update(accountId,account);
  }


  getAccountType(accountId: string): AccountEntity {
    const account = this.accountRepository.findOneById(accountId);
    return account;
  }


  changeAccountType(accountId: string,accountTypeId: string,): AccountTypeEntity {
    const account = this.accountRepository.findOneById(accountId);
    account.account_type_id = this.accountTypeRepository.findOneById(accountTypeId);
    this.accountRepository.update(accountId,account);
    return account.account_type_id; 
  }

 
  deleteAccount(accountId: string , sof? : boolean): void {
    const entity = this.accountRepository.findOneById(accountId);
    if(entity.balance != 0) throw new Error(`No se puede borrar
    la cuenta porque el balance no es 0 , por favor transfiera a otra cuenta `);

    if(sof) this.accountRepository.delete(accountId,sof);
    this.accountRepository.delete(accountId);
  }


}