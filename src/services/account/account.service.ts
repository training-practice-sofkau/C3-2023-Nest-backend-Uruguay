import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

import { AccountModel } from '../../models';
import { AccountEntity, AccountTypeEntity } from '../../persistence/entities';
import { AccountRepository } from '../../persistence/repositories';


@Injectable()
export class AccountService {

    constructor(
      private readonly accountRepository: AccountRepository,       
      ) {}
    
   /**
   * Create a new account - OK
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: AccountModel): AccountEntity {
    
    const newAccount = new AccountEntity();

    newAccount.customerId = account.customerId;
    newAccount.accountTypeId = account.accountTypeId;
    
    return this.accountRepository.register(newAccount);
  }

  /**
   * Obtener el balance de una cuenta - OK
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    
    return this.accountRepository.findOneById(accountId).balance;

  }

  /**
   * Agregar balance a una cuenta  - OK
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    
    if(amount < 0){
      throw new Error(`Negative amounts are not allowed!`);
    }

    this.accountRepository.addAmountToBalance(accountId, amount);

  }

  /**
   * Remover balance de una cuenta  - OK
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    
    
    if(amount < 0){
      throw new Error(`Negative amounts are not allowed!`);
    }

    if(!this.verifyAmountIntoBalance(accountId, amount)) {
      throw new Error(`Not enough founds in Account Balance!`);
    }

    this.accountRepository.removeAmountToBalance(accountId, amount);

  }

  /**
   * Verificar la disponibilidad de un monto a retirar en una cuenta - OK
   *
   * @param {string} accountId
   * @param {number} amount
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {

    return this.getBalance(accountId) >= amount ? true : false;

  }

  /**
   * Obtener el estado de una cuenta - OK
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    
    return this.accountRepository.findOneById(accountId).state; 

  }

  /**
   * Cambiar el estado de una cuenta - OK
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    
    this.accountRepository.setAccountState(accountId, state);
  }

  /**
   * Obtener el tipo de cuenta de una cuenta - OK
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    
    return this.accountRepository.findOneById(accountId).accountTypeId;

  }

  /**
   * Cambiar el tipo de cuenta a una cuenta - OK
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccountType(accountId: string, accountTypeId: string): AccountTypeEntity {

    let accountType = this.accountRepository.getAccountType(accountId);

    if(accountType.id === accountTypeId){
      throw new Error('The Account Type is already the same');
    }

    return this.accountRepository.setAccountType(accountId, accountType);

  }

  /**
   * Deletes the account that matches the given ID - OK
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {

    this.accountRepository.delete(accountId, true); //TODO: Soft Delete by Default, implement hard/soft selection. 

  }
}
