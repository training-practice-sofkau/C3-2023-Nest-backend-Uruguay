import { Injectable } from '@nestjs/common';
import { AccountEntity, AccountTypeEntity } from '../../persistence/entities/';
import {
  AccountRepository,
  AccountTypeRepository,
} from '../../persistence/repositories/';
import { PaginationModel } from '../../models/pagination-model.model';
import { CustomerEntity } from '../../persistence/entities/customer.entity';
import { AccountController } from '../../controllers/account/account.controller';
import { CreateAccountDTO } from '../../dtos/create-account.dto';
import { CustomerRepository } from '../../persistence/repositories/customer.repository';
import { AccountDTO } from '../../dtos/account.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: CreateAccountDTO): AccountEntity {
    const customer = this.customerRepository.findOneById(account.customerId);
    const accountType = new AccountTypeEntity();

    const newAccount = new AccountEntity();
    newAccount.customer = customer;
    newAccount.accountType = accountType;
    return this.accountRepository.register(newAccount);
  }

  findAll(pagination: PaginationModel): AccountEntity[] {
    return this.accountRepository.findAll(pagination);
  }

  findOneById(accountId: string): AccountEntity {
    return this.getAccount(accountId);
  }

  findByCustomer(
    customerId: string,
  ): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    return this.getAccount(accountId).balance;
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    return this.getAccount(accountId).accountType;
  }

  getCustomer(accountId: string): CustomerEntity {
    return this.getAccount(accountId).customer;
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    return this.getAccount(accountId).state;
  }

  updateAccount(accountId: string , newAccount: AccountDTO) {
    let account = this.getAccount(accountId);
    // const accountType = this.accountTypeRepository.findOneById(newAccount.accountType);

    // account.accountType = accountType;
    account.balance = newAccount.balance;
    account.state = newAccount.state;

    return this.accountRepository.update(accountId, account);
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    const account = this.getAccount(accountId);
    let balance: number = account.balance; 
    balance += amount;
    account.balance = balance;

    this.accountRepository.update(accountId, account);
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccountType(
    accountId: string,
    accountTypeId: string,
  ): AccountTypeEntity {
    const account = this.getAccount(accountId);
    account.accountType = this.accountTypeRepository.findOneById(accountTypeId);

    this.accountRepository.update(accountId, account);

    return account.accountType;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    const account = this.getAccount(accountId);
    account.state = state;

    this.accountRepository.update(accountId, account);
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string, soft?: boolean): void {
    if (this.getAccount(accountId).balance != 0)
      throw new Error(
        'Cannot Delete this Account. Please transfer your balance to another account',
      );

    if (soft) this.accountRepository.delete(accountId, soft);

    this.accountRepository.delete(accountId);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number, removeAll?: boolean): void {
    if (this.verifyAmountIntoBalance(accountId, amount))
      throw new Error('Not enough funds');

    if (removeAll) this.cleanBalance(accountId);

    const account = this.getAccount(accountId);
    let balance: number = account.balance; 
    balance += amount;
    account.balance = balance;

    this.accountRepository.update(accountId, account);
  }

  private cleanBalance(accountId: string): number {
    const account = this.getAccount(accountId);
    account.balance = 0;

    this.accountRepository.update(accountId, account);

    return account.balance;
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
    if (this.getAccount(accountId).balance < amount) {
      return true;
    }

    return false;
  }

  private getAccount(accountId: string): AccountEntity {
    return this.accountRepository.findOneById(accountId);
  }
}
