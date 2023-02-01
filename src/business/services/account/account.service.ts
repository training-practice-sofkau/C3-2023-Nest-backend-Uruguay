import { AccountRepository } from './../../../Data/persistence/repositories/account.repository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AccountDtos } from 'src/business/dtos/accountDtos';
import { AccountEntity,  AccountTypeEntity, AccountTypeRepository } from 'src/Data/persistence';
import { CustomerRepository } from '../../../Data/persistence/repositories/customer.repository';




@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly AccountTypeRepository: AccountTypeRepository,private readonly CustomerRepository: CustomerRepository
  ) {}

  /**
   *
   */
  createAccount(account: AccountDtos): AccountEntity {
    const newAccount = new AccountEntity();
    newAccount.customer = account.customer;
    newAccount.accountType = account.accountType;
    newAccount.acc_Balance = account.acc_Balance;
    this.CustomerRepository.register(newAccount.customer)
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
  addBalance(accountId: string, amount: number): void {
    console.log(accountId)
    if (typeof amount !== 'number') {
       amount =parseInt(amount)
    }
    console.log(amount)
    if (amount <= 0) {
      throw new NotFoundException("afas");
    }
    let account = this.accountRepository.searchByAttributesforOne(
      'id',
      accountId,
    );
    console.log(account)
    console.log(amount)
    account.acc_Balance = account.acc_Balance + amount;
    this.accountRepository.update(accountId, account);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    if (amount <= 0) {
      throw new NotFoundException();
    }
    let account = this.accountRepository.searchByAttributesforOne(
      'id',
      accountId,
    );
    account.acc_Balance -= amount;
    this.accountRepository.update(accountId, account);
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
    this.AccountTypeRepository.update(accountId, account);
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    return this.AccountTypeRepository.searchByAttributesforOne("id", accountId);
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccntType(accountId: string, accountTypeId: string): AccountTypeEntity {
    let account = this.getAccountType(accountId);
    account.id = accountTypeId;
    this.AccountTypeRepository.update(accountId, account);
    return account;
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string, soft?: boolean): void {
    this.accountRepository.delete(accountId, soft);
  }
}
