import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from 'src/business/dtos/createAccount.dto';
import { AccountEntity, AccountTypeEntity, CustomerRepository } from 'src/data/persistence';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';
import { ChangeAccountTypeDto } from '../../dtos/changeAccountType.dto';
import { AccountTypeRepository } from '../../../data/persistence/repositories/account-type.repository';
import { CreateAccountTypeDto } from 'src/business/dtos/createAccountType.dto';


@Injectable()
export class AccountService {

    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly accountTypeRepocitory: AccountTypeRepository,
        private readonly customerRepocitory: CustomerRepository
    ) {

        const newAccTypeEntity = new AccountTypeEntity
        newAccTypeEntity.id = "ef7e8c74-99a7-4c11-a806-db1dd3575851"
        newAccTypeEntity.name = "Cuenta Corriente Pesos"
        this.accountTypeRepocitory.register(newAccTypeEntity)

        newAccTypeEntity.id = "64e40ae6-5374-4ac5-8498-1beac191d535"
        newAccTypeEntity.name = "Caja de Ahorro Dolares"
        this.accountTypeRepocitory.register(newAccTypeEntity)
    }
    /**
     * Crear una cuenta
     *
     * @param {AccountModel} account
     * @return {*}  {AccountEntity}
     * @memberof AccountService
     */
    createAccountType(accountType: CreateAccountTypeDto): AccountTypeEntity {
        try {
            const accType = new AccountTypeEntity()
            
            accType.name = accountType.name
            accType.state = true
            return this.accountTypeRepocitory.register(accType);
        } catch (error) {
            throw new Error('This method is not implemented createAccountType');
        }
    }

    createAccount(account: CreateAccountDto): AccountEntity {
        try {
            const newAccount = new AccountEntity()
            const newAccountType = this.accountTypeRepocitory.findOneById(account.account_type_id)
            newAccount.account_type_id = newAccountType
            newAccount.balance = account.balance
            //aca deberiamos traer el objeto Customer por id
            //pero como estamos haciendo pruebas es mas factible asi
            newAccount.customer_id = this.customerRepocitory.findOneById(account.CustomerId)
            return this.accountRepository.register(newAccount);
        } catch (error) {
            throw new Error('This method is not implemented createAccount');
        }
    }


    /**
     * Obtener el balance de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {number}
     * @memberof AccountService
     */
    getBalance(accountId: string): number {
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
        let acc = this.accountRepository.findOneById(accountId)
        acc.balance += amount
        this.accountRepository.update(accountId, acc)
    }

    /**
     * Remover balance de una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    removeBalance(accountId: string, amount: number): void {
        let acc = this.accountRepository.findOneById(accountId)
        acc.balance -= amount
        this.accountRepository.update(accountId, acc)
        //throw new Error('This method is not implemented');
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
        let acc = this.accountRepository.findOneById(accountId)
        acc.balance += amount
        if (acc.balance < amount) {
            return false
        }
        return true
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
        let acc = this.accountRepository.findOneById(accountId)
        acc.state = state
        this.accountRepository.update(accountId, acc)

    }

    /**
     * Obtener el tipo de cuenta de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {AccountTypeEntity}
     * @memberof AccountService
     */
    getAccountTypeByAccount(accountId: string): AccountTypeEntity {
        let acc = new AccountTypeEntity;
        acc = this.accountRepository.findOneById(accountId).account_type_id
        // acc = this.accountRepository.findOneById(accountId)
        return acc
    }


    getAccountTypeOneById(accountTypeId: string): AccountTypeEntity {
        let acc = new AccountTypeEntity;
        acc = this.accountTypeRepocitory.findOneById(accountTypeId)
        return acc
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
        chAccountType: ChangeAccountTypeDto
    ): AccountTypeEntity {
        let acc = this.accountRepository.findOneById(chAccountType.accountId)
        acc.account_type_id.id = chAccountType.accountTypeId
        return this.accountRepository.update(chAccountType.accountId, acc).account_type_id
    }

    //actualizo todos los atributos de account
    updateAccount(
        account: CreateAccountDto
    ): AccountEntity {
        let acc = this.accountRepository.findOneById(account.id)
        acc.account_type_id.id = account.account_type_id
        acc.balance = account.balance

        acc.customer_id = this.customerRepocitory.findOneById(account.CustomerId)
        acc.state = account.state

        return this.accountRepository.update(account.id, acc)
    }


    getId(id: string): AccountEntity {
        const account = this.accountRepository.findOneById(id)
        return account
    }
    /**
     * Borrar una cuenta
     *
     * @param {string} accountId
     * @memberof AccountService
     */
    deleteAccount(accountId: string, sof?: boolean): void {
        this.accountRepository.delete(accountId, sof)
    }

    getAccountTypeAll(): AccountTypeEntity[] {
        let acc: AccountTypeEntity[] = []
        acc = this.accountTypeRepocitory.findAll();
        return acc
    }

    getAccountAll(): AccountEntity[] {
        let acc: AccountEntity[] = []
        acc = this.accountRepository.findAll();
        return acc
    }

}
