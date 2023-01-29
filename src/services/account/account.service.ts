import { Injectable } from '@nestjs/common';

import { AccountModel } from '../../models';
import { AccountEntity, AccountTypeEntity } from '../../persistence/entities';
import { AccountRepository } from '../../persistence/repositories';


@Injectable()
export class AccountService {

    constructor(
      private readonly accountRepository: AccountRepository,       
      ) {}
    
   /**
   * Create a new account - OK   *
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
   * Update the data of the account that matches the given ID
   * @param accountId ID of account to update
   * @param newAccountDetails new data
   * @returns updated entity
   */
  updateAccount(accountId: string, newAccountDetails: AccountModel) : AccountEntity{

    return this.accountRepository.update(accountId, newAccountDetails);

  }

  /**
   * Get account balance - OK   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    
    return this.accountRepository.findOneById(accountId).balance;

  }

  /**
   * Add an amount to account balance  - OK   *
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
   * Remove an amount from account balance  - OK   *
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
   * Verify if account balance has enough to make a withdraw - OK   
   * Private Method
   * @param {string} accountId
   * @param {number} amount
   * @return {*}  {boolean}
   * @memberof AccountService
   */
   private verifyAmountIntoBalance(accountId: string, amount: number): boolean {

    return this.getBalance(accountId) >= amount ? true : false;

  }

  /**
   * Get account State - OK   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    
    return this.accountRepository.findOneById(accountId).state; 

  }

  /**
   * Set state account - OK   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    
    this.accountRepository.setAccountState(accountId, state);
  }

  /**
   * Get account type - OK   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    
    return this.accountRepository.findOneById(accountId).accountTypeId;

  }

  /**
   * Set account type - OK   *
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
   * Deletes the account that matches the given ID - OK   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {

    this.accountRepository.delete(accountId, true); //TODO: Soft Delete by Default, implement hard/soft selection. 

  }
}
