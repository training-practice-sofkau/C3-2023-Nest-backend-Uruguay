// Libraries
import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { ChangeAccountTypeDto, CreateAccountDto } from 'src/presentation/dtos';

// Repositories & Entities
import { AccountEntity, AccountRepository, AccountTypeEntity, AccountTypeRepository } from 'src/data';


@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository) { }


  getId(id: string):AccountEntity{
    const account = this.accountRepository.findOneById(id)
    return account
  }
  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: CreateAccountDto): AccountEntity {
    const newAccount = new AccountEntity();
    const newAccountType = new AccountTypeEntity()
    newAccountType.id = account.accountTypeId
    newAccount.accountType = newAccountType;
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
    const account = this.accountRepository.findOneById(accountId)
    return account.balance
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    if (amount > 0) {
      this.accountRepository.updateBalance(accountId, amount)
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
        this.accountRepository.updateBalance(accountId, -amount)
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
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
    try {
      if (amount > 0 &&
        this.accountRepository.findOneById(accountId).balance >= amount) {
        return true
      } else return false
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    try {
      return this.accountRepository.findOneById(accountId).state
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state?: boolean): void {
    try {
      let actualState = this.accountRepository.findOneById(accountId);
      actualState.state = !actualState.state
      this.accountRepository.update(accountId, actualState);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountEntity {
    try {
      return this.accountRepository.findOneById(accountId)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
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
    account: ChangeAccountTypeDto
  ): AccountTypeEntity {
    try {
      const changeType = this.accountRepository.findOneById(account.accountId)
      changeType.accountType = this.accountTypeRepository.findOneById(account.accountTypeId)
      return this.accountRepository.update(account.accountId, changeType).accountType
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {
    try {
      this.accountRepository.delete(accountId)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}