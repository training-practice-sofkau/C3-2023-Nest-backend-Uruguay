import { Injectable } from '@nestjs/common';
import { BadRequestException, ForbiddenException, HttpException } from '@nestjs/common/exceptions';

import { AccountModel } from 'src/models';
import { AccountEntity, AccountTypeEntity } from 'src/persistence/entities';
import { AccountRepository, AccountTypeRepository } from '../../persistence/repositories';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository) {}

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: AccountModel): AccountEntity {
    const newAccount = new AccountEntity();
    newAccount.customer = account.customer;
    newAccount.accountType = account.accountType;
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
    try {
      let accountUpdated = this.accountRepository.findOneById(accountId);
      accountUpdated.balance += amount;
      this.accountRepository.update(accountId, accountUpdated);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    try {
      if (this.verifyAmountIntoBalance(accountId, amount)) {
        let accountUpdated = this.accountRepository.findOneById(accountId);
        accountUpdated.balance -= amount;
        this.accountRepository.update(accountId, accountUpdated);
      }
      else {
        throw new ForbiddenException('The amount to remove cannot be greater than the balance');
      }
      
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
    if(this.accountRepository.findOneById(accountId).balance >= amount) {
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
    try {
      let accountUpdated = this.accountRepository.findOneById(accountId);
      accountUpdated.state = state;
      this.accountRepository.update(accountId, accountUpdated);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    return this.accountRepository.findOneById(accountId).accountType;
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
    try {
      let accountUpdated = this.accountRepository.findOneById(accountId);
      let newAccountType = this.accountTypeRepository.findOneById(accountTypeId);
      accountUpdated.accountType = newAccountType;

      this.accountRepository.update(accountId, accountUpdated);

      return newAccountType;

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {
    this.accountRepository.delete(accountId);
  }
  
  /**
   * Borrar una cuenta de forma lógica
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  softDeleteAccount(accountId: string): void {
    this.accountRepository.delete(accountId, true);
  }
}