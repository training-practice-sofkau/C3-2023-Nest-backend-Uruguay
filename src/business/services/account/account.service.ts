import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { AccountEntity, AccountTypeEntity, CustomerEntity } from '../../../data/persistence/entities';
import { AccountRepository, AccountTypeRepository } from '../../../data/persistence/repositories';
import { CreateAccountDto, UpdateAccountDto } from '../../dtos';


@Injectable()
export class AccountService {
  

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) { }

  /**
  * Create a new account - OK   *
  * @param {CreateAccountDto} account
  * @return {*}  {AccountEntity}   
  */
  createAccount(account: CreateAccountDto): AccountEntity {

    const newAccount = new AccountEntity();

    const accountType = new AccountTypeEntity();
    accountType.id = account.accountTypeId;
    newAccount.accountTypeId = accountType;


    const customer = new CustomerEntity();
    customer.id = account.customerId;
    newAccount.customerId = customer;
    

    return this.accountRepository.register(newAccount);
  }

  /**
   * Update the data of the account that matches the given ID
   * @param accountId ID of account to update
   * @param newAccountDetails new data
   * @returns updated entity
   */
  updateAccount(accountId: string, newAccountDetails: UpdateAccountDto): AccountEntity {

    const newAccount = new AccountEntity();   
  
    const newAccountType = new AccountTypeEntity();
    newAccountType.id = newAccountDetails.accountTypeId;
    newAccount.accountTypeId = newAccountType;
      
    const newCustomer = new CustomerEntity();
    newCustomer.id = newAccountDetails.customerId;
    newAccount.customerId = newCustomer;    
    
    newAccount.balance = newAccountDetails.balance; 

    newAccount.state = newAccountDetails.state; 

    return this.accountRepository.update(accountId, newAccount);

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

    if (amount < 0) {
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

    if (amount < 0) {
      throw new Error(`Negative amounts are not allowed!`);
    }

    if (!this.verifyAmountIntoBalance(accountId, amount)) {
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
   * Return all the accounts in the DB
   * @returns array of entities
   */
  getAllAccounts(): AccountEntity[] {
    return this.accountRepository.findAll();
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

    let accountType = this.accountTypeRepository.findOneById(accountTypeId);

    //this.accountRepository.getAccountType(accountId);

    if (accountType.id === accountTypeId) {
      throw new Error('The Account Type is already the same');
    }

    return this.accountRepository.setAccountType(accountId, accountType);

  }

  /**
   * Deletes the account that matches the given ID - OK   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string, soft?: boolean): void {

    //Validate if account has zero balance
    if(this.getBalance(accountId) === 0){
      
      this.accountRepository.delete(accountId, soft); //TODO: Soft Delete by Default, implement hard/soft selection. 

    }else{
      
      throw new InternalServerErrorException("Account is not Empty!. Delete Canceled");
    }

  }
}
