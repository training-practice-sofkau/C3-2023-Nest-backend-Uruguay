import { Injectable, NotAcceptableException } from '@nestjs/common';
import { accountType } from 'src/models';
import { AccountTypeModel} from 'src/persistence/entities/account.type.entities';
import { AccountTypeRepository } from 'src/persistence/repositories';

@Injectable()
export class AccountService {
constructor(private readonly accountRepository: AccountTypeRepository) {}

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: accountType): AccountTypeModel {

    const newAccount = new AccountTypeModel();
    newAccount.acctp_id = account.acctp_id;
    newAccount.acctp_state = account.acctp_state
    newAccount.acctp_name = account.acctp_name;

    return this.accountRepository.register(newAccount);
  }


  /**
   * Obtener el balance de una cuenta
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string):number{
    
    const entityBalance = this.accountRepository.findOneById(accountId); 

    return entityBalance.acctp_balance;
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
    account.acctp_balance += amount;
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

    if(account.acctp_balance < amount ) 
    throw new NotAcceptableException(`El monto : ${amount}
    es superior al balance de la cuenta`);

    account.acctp_balance -= amount;

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
    
    if(account.acctp_balance < amount  || account.acctp_balance == 0) 
    throw new NotAcceptableException(`El monto : ${amount}
    es superior al balance de la cuenta`);

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
    return account.acctp_state;
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
   account.acctp_state = state;
   this.accountRepository.update(accountId,account);
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): accountType {
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
  changeAccountType(accountId: string,accountTypeId: string,): AccountTypeModel {
    const account = this.accountRepository.findOneById(accountId);
    return account;
    
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