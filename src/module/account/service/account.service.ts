import { Injectable, NotAcceptableException } from '@nestjs/common';

import { AccountRepository, AccountTypeRepository } from '../Account.Repositories';
import { AccountEntity } from '../account.entities';
import { AccountModel } from '../accountModel.interface';
import { AccountTypeEntity } from '../account.Type.Entity';
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
    newAccount.coustomer_id = account.coustomer_id;

    return this.accountRepository.register(newAccount);
  }


  /**
   * Obtener el balance de una cuenta
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string):number{
    
    const accountEntity = this.accountRepository.findOneById(accountId); 

    return accountEntity.balance;
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    const account = this.accountRepository.findOneById(accountId);
    //validar el amount 
    account.balance += amount;
    this.accountRepository.update(accountId,account);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  //remover cierto balance pero si es mayor a lo que tengo 
  removeBalance(accountId: string, amount: number): void {
    const account = this.accountRepository.findOneById(accountId);

    if(this.verifyAmountIntoBalance(accountId,amount) === false) 
    throw new NotAcceptableException(`El monto : ${amount}
     es incorrecto , verifique que el monto ingresado no sea inferior a 0, o superior al  
     balance : ${account.balance}`); 

    account.balance -= amount;

    this.accountRepository.update(accountId,account);
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
    const account = this.accountRepository.findOneById(accountId);
    
    if(account.balance < amount  || account.balance == 0 || amount <0) return false;

    return true;
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    const account = this.accountRepository.findOneById(accountId);
    return account.state;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
   const account = this.accountRepository.findOneById(accountId);
   account.state = state;

   this.accountRepository.update(accountId,account);
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountEntity {
    const account = this.accountRepository.findOneById(accountId);
    return account;
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccountType(accountId: string,accountTypeId: string,): AccountTypeEntity {
    const account = this.accountRepository.findOneById(accountId);
    account.account_type_id = this.accountTypeRepository.findOneById(accountTypeId);
    this.accountRepository.update(accountId,account);
    return account.account_type_id; 
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string , sof? : boolean): void {
    const entity = this.accountRepository.findOneById(accountId);
    if(entity.balance != 0) throw new Error(`No se puede borrar
    la cuenta porque el balance no es 0 , por favor transfiera a otra cuenta `);

    if(sof) this.accountRepository.delete(accountId,sof);
    this.accountRepository.delete(accountId);
  }


}