import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { IAccountModel } from 'src/models/i-account-model';
import { AccountEntity } from 'src/persistence/entities/account-entity';
import { AccountTypeEntity } from 'src/persistence/entities/account-type-entity';
import { AccountRepository } from 'src/persistence/repositories/AccountRepo';
import { CustomerRepo } from 'src/persistence/repositories/CustomerRepo';
import { AccountTypeRepository } from 'src/persistence/repositories/TypeAccountRepo';
import { CustomerRepositoryInterface } from 'src/persistence/repositories/interface/i-customer-repo';

@Injectable()
export class AccountService {


    constructor(private readonly accountRepository: AccountRepository,
        private readonly accountTypeRepository: AccountTypeRepository,
        private readonly customerRepository: CustomerRepo) {
    }

    /**
   Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
    createAccount(account: IAccountModel): AccountEntity {
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
        // return this.getAccount(accountId).balance;
        return this.accountRepository.findOneById(accountId).balance
    }

    /**
     * Agregar balance a una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    addBalance(accountId: string, amount: number): void {

        const currentEntity = this.accountRepository.findOneById(accountId);

        currentEntity.balance = currentEntity.balance + amount;
        
        this.accountRepository.update(accountId, currentEntity)

    }


    /**
     * Remover balance de una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    removeBalance(accountId: string, amount: number): void {

        const currentEntity = this.accountRepository.findOneById(accountId);

        if (currentEntity.balance < amount) {

            throw new NotAcceptableException('Lo siento, no dispone de ese saldo!')

        } else {

            currentEntity.balance = currentEntity.balance - amount;

            this.accountRepository.update(accountId, currentEntity)
        }


    }

    private cleanBalance(accountId: string): number {
        return this.getAccount(accountId).balance = 0;
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

        const currentEntity = this.accountRepository.findOneById(accountId);

        if (currentEntity.balance < amount || currentEntity.balance < 1) {

            throw new NotAcceptableException('Lo siento, no dispone de ese saldo!')

        } else return true;
    }

    /**
     * Obtener el estado de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {boolean}
     * @memberof AccountService
     */
    getState(accountId: string): boolean {

        const currentEntity = this.accountRepository.findOneById(accountId);

        return currentEntity.state;
    }

    /**
     * Cambiar el estado de una cuenta
     *
     * @param {string} accountId
     * @param {boolean} state
     * @memberof AccountService
     */
    changeState(accountId: string, state: boolean): void {

        const currentEntity = this.accountRepository.findOneById(accountId);

        currentEntity.state = state;

        this.accountRepository.update(accountId, currentEntity)
    }

    /**
     * Obtener el tipo de cuenta de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {AccountTypeEntity}
     * @memberof AccountService
     */
    getAccountType(accountId: string): AccountTypeEntity {

        return this.getAccount(accountId).accountTypeId;
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
        account.accountTypeId = this.accountTypeRepository.findOneById(accountTypeId);

        return account.accountTypeId;
    }

    /**
     * Borrar una cuenta
     *
     * @param {string} accountId
     * @memberof AccountService
     */
    deleteAccount(accountId: string, soft?: boolean): void {
        if (soft) this.accountRepository.delete(accountId, soft);

        this.accountRepository.delete(accountId);
    }

    private getAccount(accountId: string): AccountEntity {
        return this.accountRepository.findOneById(accountId);
    }


}
