import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/models';
import { AccountEntity, AccountTypeEntity } from 'src/persistence';
import { CustomerEntity } from 'src/persistence/entities/';
import { AccountRepository } from '../../persistence/repositories/account.repository';

@Injectable()
export class AccountService {

    constructor(
        private readonly accountRepository: AccountRepository

        ){}
    /**
     * Crear una cuenta
     *
     * @param {AccountModel} account
     * @return {*}  {AccountEntity}
     * @memberof AccountService
     */
    createAccount(account: AccountModel): AccountEntity {
        const newAccount = new AccountEntity();
        newAccount.customer_id = account.customer_id;
        newAccount.acount_type_id = account.acount_type_id;
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
        throw new Error('This method is not implemented');
    }

    /**
     * Agregar balance a una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    addBalance(accountId: string, amount: number): void {
        throw new Error('This method is not implemented');
    }

    /**
     * Remover balance de una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    removeBalance(accountId: string, amount: number): void {
        throw new Error('This method is not implemented');
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
        throw new Error('This method is not implemented');
    }

    /**
     * Obtener el estado de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {boolean}
     * @memberof AccountService
     */
    getState(accountId: string): boolean {
       //consultar si se puede asi
      return this.accountRepository.findOneById(accountId).state
    }

    /**
     * Cambiar el estado de una cuenta
     *
     * @param {string} accountId
     * @param {boolean} state
     * @memberof AccountService
     */
    changeState(accountId: string, state: boolean): void {
        let  acc = this.accountRepository.findOneById(accountId)
        acc.state = state
        this.accountRepository.update(accountId,acc)

    }

    /**
     * Obtener el tipo de cuenta de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {AccountTypeEntity}
     * @memberof AccountService
     */
    getAccountType(accountId: string): AccountTypeEntity {
        let  acc = this.accountRepository.findOneById(accountId)
        acc =this.accountRepository.findOneById(accountId)
        return acc.account_type_id
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

        let  acc = this.accountRepository.findOneById(accountId)
        acc =this.accountRepository.findOneById(accountId)
        acc.account_type_id.id =  accountTypeId

        return this.accountRepository.update(accountId, acc).account_type_id
    }

    /**
     * Borrar una cuenta
     *
     * @param {string} accountId
     * @memberof AccountService
     */
    deleteAccount(accountId: string): void {

        this.accountRepository.delete(accountId) 
        
    }


}
