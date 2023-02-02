import {  Injectable, NotAcceptableException } from '@nestjs/common';
import { AccountRepository, AccountTypeRepository } from '../../capaDeDato/repositories';
import { AccountEntity } from '../../capaDeDato/entity/account.entities';
import { CreateAccountdto } from '../dto/create-account.dto';
import { CustomerEntity, CustomerService } from 'src/module/customer';
import { AccountDto } from '../dto/account.dto';
import { AccountTypeEntity } from '../../capaDeDato/entity';
import { AccountTypeDto } from '../dto/accountType.dto';

@Injectable()
export class AccountService {

  constructor(
    private readonly accountRepository: AccountRepository, 
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly customerServer: CustomerService,) {}

  createAccount(account: CreateAccountdto): AccountEntity {
    const customer = this.customerServer.getCustomerInfo(account.customer);
    //estoy buscando un accountType que no existe en la base de datos porque nunca lo creo
    const accountType = this.accountTypeRepository.findOneById(account.accountTypeId);
    
    const newAccount = new AccountEntity();
    newAccount.coustomer_id = customer;
    newAccount.account_type_id = accountType;
    
    return this.accountRepository.register(newAccount);
  }

  createAccountType(accountTypeDTO: AccountTypeDto): AccountTypeEntity {
    const newAccountType = new AccountTypeEntity();
    newAccountType.name = accountTypeDTO.name;

    return this.accountTypeRepository.register(newAccountType);
  }

  updateAccount(accountId: string, newAccount: AccountDto) {
    let account = this.getById(accountId);
    let accountType: AccountTypeEntity;
    if(typeof newAccount.accountType != 'undefined') {
      accountType = this.accountTypeRepository.findOneById(newAccount.accountType);
      account.account_type_id = accountType;
    }
    
    if(typeof newAccount.balance != 'undefined') account.balance = newAccount.balance;
    if(typeof newAccount.state != 'undefined') account.state = newAccount.state;

    return this.accountRepository.update(accountId, account);

  }

  findByCustomer(
    customerId: string,
  ): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
  }
  
  getById(accountId : string):AccountEntity{

    const accountEntity = this.accountRepository.findOneById(accountId); 

    return accountEntity;
  }



  getBalance(accountId: string):number{
    
    const accountEntity = this.accountRepository.findOneById(accountId); 

    return accountEntity.balance;
  }

  addBalance(accountId: string, amount: number): void {
    const account = this.accountRepository.findOneById(accountId);
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

  findAllAccountTypes(): AccountTypeEntity[] {
    return this.accountTypeRepository.findAll()
  }

  findAccountType(id: string): AccountTypeEntity {
    return this.accountTypeRepository.findOneById(id);
  }

  getCustomer(accountId: string): CustomerEntity {
    return this.accountRepository.findOneById(accountId).coustomer_id; 
  }

  

}