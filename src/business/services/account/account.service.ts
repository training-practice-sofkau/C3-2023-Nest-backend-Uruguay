import { AccountRepository } from './../../../Data/persistence/repositories/account.repository';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AccountDtos } from 'src/business/dtos/accountDtos';
import { AccountEntity,  AccountTypeEntity, AccountTypeRepository, CustomerEntity } from 'src/Data/persistence';
import { CustomerRepository } from '../../../Data/persistence/repositories/customer.repository';
import { v4 as uuid } from 'uuid';
import { NewaccountDto } from 'src/business/dtos/newAccountDto';




@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository
  ) {}

  /**
   *
   */
  createAccount(account: AccountDtos ): AccountEntity {     
          return this.accountRepository.register(account);
  }

  registerNewAccountType(account: NewaccountDto): AccountEntity {

    const newAccount = new AccountEntity();
    const accountType = new AccountTypeEntity();

    accountType.id = account.accountTypeId;
    accountType.name = account.name
    newAccount.accountType = accountType;

    const customer = this.accountRepository.searchByAttributesforOne('id', account.accountID)
    newAccount.customer = customer.customer;
    newAccount.acc_Balance = 0;
    newAccount.state = true;

    
    return this.accountRepository.register(newAccount);
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    let account = this.accountRepository.searchByAttributesforOne(
      'id',
      accountId,
    );
    console.log(account);
    return Number(account.acc_Balance|| 0);
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): AccountEntity {
   
 
    let account = this.accountRepository.searchByAttributesforOne(
      'id',
      accountId,
    );
 
    account.acc_Balance = account.acc_Balance + amount;
  return  this.accountRepository.update(accountId, account);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): AccountEntity {
   
    console.log(amount)
    let account = this.accountRepository.searchByAttributesforOne(
      'id',
      accountId,
    );
    if (account.acc_Balance >= amount) {
    account.acc_Balance -= amount;
    
   return  this.accountRepository.update(accountId, account)
  }
  else
  {
    throw new NotFoundException ("Account not balance in account")
  }
  
    
  }
  /**
   * Verificar la disponibilidad de un monto a retirar en una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    let balance = this.accountRepository.searchByAttributesforOne(
      'id',
      accountId,
    ).acc_Balance;
        if (balance >= amount) {
      return true;
    }
    return false;
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    return this.accountRepository.searchByAttributesforOne('id', accountId).state;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    let account = this.accountRepository.searchByAttributesforOne(
      'id',
      accountId,
    );
    account.state = state;
    console.log(account.state);
    this.accountRepository.update(accountId, account);
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    return this.accountRepository.searchByAttributesforOne("id", accountId).accountType;
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccntType(accountId: string): AccountTypeEntity {
    let account = this.accountRepository.searchByAttributesforOne("id", accountId);
    account.accountType.id = uuid()
    this.accountRepository.update(accountId, account);
    return account;
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string, soft?: boolean): void {
    if(this.getBalance(accountId) === 0){
      
      this.accountRepository.delete(accountId, soft); 

    }else{
      
      throw new InternalServerErrorException("Account is not Empty!");
  }
  }
  findALl(): AccountEntity[] {
    return this.accountRepository.findAll()
  }
}
