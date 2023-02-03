import {  Injectable, NotAcceptableException } from '@nestjs/common';
import { AccountRepository, AccountTypeRepository } from '../../capaDeDato/repositories';
import { AccountEntity } from '../../capaDeDato/entity/account.entities';
import { CreateAccountdto } from '../dto/create-account.dto';
import { AccountDTO } from '../dto/account.dto';
import { AccountTypeEntity } from '../../capaDeDato/entity';
import { AccountTypeDto } from '../dto/accountType.dto';
import { CustomerEntity } from 'src/module/customer/capaDeDato/entity';
import { CustomerRepository } from '../../../customer/capaDeDato/repository/customer.repository';
import { PaginationModel } from 'src/module/base/models';
import { ChangeAccountTypeDTO } from '../dto/changeAccountType.dto';

@Injectable()
export class AccountService {

  constructor(
    private readonly accountRepository: AccountRepository, 
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly customerRepository: CustomerRepository,) {}

  createAccount(account: CreateAccountdto): AccountEntity {
    const customer = this.customerRepository.findOneById(account.customer);
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

  updateAccount(accountId: string, newAccount: AccountDTO) {
    let account = this.accountRepository.findOneById(accountId);
    let accountType = new AccountTypeEntity();
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

  findAll(pagination: PaginationModel): AccountEntity[] {
    return this.accountRepository.findAll(pagination);
  }

  getBalance(accountId: string):number{
    
    const accountEntity = this.accountRepository.findOneById(accountId); 

    return accountEntity.balance;
  }

  addBalance(accountId: string, amount: AccountDTO): void {
    const account = this.accountRepository.findOneById(accountId);
    
    if(typeof amount.balance != 'undefined')
    account.balance += amount.balance;

    this.accountRepository.update(accountId,account);
  }

  removeBalanceAll(accountId: string): void {
    const account = this.accountRepository.findOneById(accountId);
    account.balance -= account.balance;

    this.accountRepository.update(accountId, account);
  }

  removeBalance(accountId: string, amount: number): void {
    if(typeof amount === 'undefined') throw new NotAcceptableException(`Balance indefinido ${amount}`);

    if(this.verifyAmountIntoBalance(accountId,amount) === false) 
    throw new NotAcceptableException(`El monto : ${amount}
    es incorrecto , verifique que el monto ingresado no sea inferior a 0, o superior al  
    balance de la cuenta`); 
    const account = this.accountRepository.findOneById(accountId);

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


  getAccountType(accountId: string): AccountTypeEntity {
    const account = this.accountTypeRepository.findOneById(accountId);
    return account;
  }


  changeAccountType(accountId: string,accountTypeId: ChangeAccountTypeDTO): AccountTypeEntity {
    const account = this.accountRepository.findOneById(accountId);
    if(typeof accountTypeId.accountType === `undefined`) throw new Error(`Tipo de cuenta undefined`); 
    account.account_type_id = this.accountTypeRepository.findOneById(accountTypeId.accountType);
    this.accountRepository.update(accountId,account);
    return account.account_type_id; 
  }

 
  deleteAccount(accountId: string , sof? : boolean): void {
    const entity = this.accountRepository.findOneById(accountId);
    if(entity.balance != 0) throw new Error(`No se puede borrar
    la cuenta porque el balance no es 0 `);

    if(sof) 
    this.accountRepository.delete(accountId,sof);
    if(!sof)
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