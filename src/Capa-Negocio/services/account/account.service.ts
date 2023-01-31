import { Injectable } from '@nestjs/common';
import { AccountRepository, AccountEntity, AccountTypeEntity } from 'src/Capa-Data/persistence';
import { CreateAccountDto } from 'src/Capa-Presentacion/dtos/account.dto';


@Injectable()
export class AccountService {
  //accountRepositorio(rojo) va a tener todas las funciones de AccountRepository
  constructor(private readonly accountRepository: AccountRepository) {}

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: CreateAccountDto): AccountEntity {
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
    
    let accBalance = this.accountRepository.findOneById(accountId);
    accBalance.balance = accBalance.balance + amount;
    this.accountRepository.update(accountId, accBalance);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    
    let accBalance = this.accountRepository.findOneById(accountId);
    accBalance.balance = accBalance.balance - amount;
    this.accountRepository.update(accountId, accBalance);
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
    
   let accBalance = this.accountRepository.findOneById(accountId);
    if (accBalance.balance > amount) {
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
    
    let account = this.accountRepository.findOneById(accountId);
    account.state = state;
    this.accountRepository.update(accountId,account)

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
  changeAccountType(accountId: string): AccountTypeEntity {
    const accBalance = this.accountRepository.findOneById(accountId);
    accBalance.accountType.id = accountId;
    return this.accountRepository.update(accountId, accBalance).accountType;
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
}
