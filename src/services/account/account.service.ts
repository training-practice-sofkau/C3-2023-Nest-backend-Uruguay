import { Injectable, NotFoundException } from '@nestjs/common';
import { stringify } from 'querystring';

import { AccountModel } from '../../models';
import { AccountEntity, AccountRepository, AccountTypeEntity } from '../../persistence';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  /**
   * Crear una cuenta
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
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    return this.accountRepository.findOneById(accountId).balance;
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    const acount = this.accountRepository.findOneById(accountId)
    acount.balance += amount;
    this.accountRepository.update(accountId, acount);
    //Validar amount negativo
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    const acount = this.accountRepository.findOneById(accountId)
    if(amount > acount.balance) {
      throw new Error('Not enough funds');
    }
    acount.balance -= amount;
    this.accountRepository.update(accountId, acount);
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
    if(this.accountRepository.findOneById(accountId).balance < amount){
      return true;
    }return false;
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    return this.accountRepository.findOneById(accountId).state;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    this.accountRepository.findOneById(accountId).state = state;
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    return this.accountRepository.findOneById(accountId).accountTypeId;
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
    const newAccount = new AccountEntity();
    const accounOriginal = this.accountRepository.findOneById(accountId);
    if (!accounOriginal) throw new NotFoundException();
    newAccount.accountTypeId.id = accountTypeId;
    newAccount.balance = accounOriginal.balance;
    newAccount.customerId = accounOriginal.customerId;
    newAccount.state = accounOriginal.state;
    newAccount.daletedAt = accounOriginal.daletedAt;
    newAccount.id = accounOriginal.id;
    newAccount.accountTypeId.name = accounOriginal.accountTypeId.name;
    newAccount.accountTypeId.state = accounOriginal.accountTypeId.state;
    return this.accountRepository.update(accountId, newAccount).accountTypeId;

  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string, soft?: boolean): void {
    if(soft) this.accountRepository.delete(accountId, soft);
    this.accountRepository.delete(accountId);
  }
}