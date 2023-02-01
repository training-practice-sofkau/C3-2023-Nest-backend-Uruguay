
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { AccountDTO } from 'src/business-logic/dtos/account-dto';
import { CreateAccountDto } from 'src/business-logic/dtos/create-account-dto';
import { PaginationModel } from 'src/data-access/models/i-pagination-model';
import { AccountEntity } from 'src/data-access/entities/account-entity';
import { AccountTypeEntity } from 'src/data-access/entities/account-type-entity';
import { CustomerEntity } from 'src/data-access/entities/customer-entity';
import { AccountRepository } from 'src/data-access/repositories/AccountRepo';
import { AccountTypeRepository } from 'src/data-access/repositories/TypeAccountRepo';
import { CustomerService } from '../customer/customer.service';
import { CustomerRepo } from 'src/data-access/repositories/CustomerRepo';

@Injectable()
export class AccountService {

    constructor(private readonly accountRepository: AccountRepository,
                private readonly accountTypeRepository: AccountTypeRepository
                ) {}

   
    //createAditionalAccount by DTO
     /*
    createAditionalAccount(account: AccountDTO): AccountEntity {

        const newAditionalAccount = new AccountEntity();
        const newAditionalAccountType = new AccountTypeEntity();

        newAditionalAccountType.name = account.accountTypeName;

        newAditionalAccount.accountTypeId = newAditionalAccountType;
        newAditionalAccount.balance = account.balance;
        newAditionalAccount.customerId = this.customerService.getCustomerInfo(account.customerId); //??

        const aditionalAccount = this.createAccount(newAditionalAccount);
         
         return newAditionalAccount
        }
    */

    createAccount(account: AccountEntity): AccountEntity {  //Le paso DTO para crear un entity
 
        return this.accountRepository.register(account);
    }

    /**
     * Obtener el balance de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {number}
     * @memberof AccountService
     */
    getBalance(accountId: string): number {
        
        const currentEntity = this.accountRepository.findOneById(accountId);

        return currentEntity.balance
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
        //hacer validacion


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

        const currentEntity = this.accountRepository.findOneById(accountId);

        return currentEntity.accountTypeId;

    }

    /**
     * Cambiar el tipo de cuenta a una cuenta
     *
     * @param {string} accountId
     * @param {string} accountTypeId
     * @return {*}  {AccountTypeEntity}
     * @memberof AccountService
      */
    changeAccountType(accountId: string, accountTypeId: string): AccountTypeEntity {

        const currentEntity = this.accountRepository.findOneById(accountId);
        
        currentEntity.accountTypeId = this.accountTypeRepository.findOneById(accountTypeId);

        return currentEntity.accountTypeId;
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


    findByCustomer(pagination: PaginationModel, customerId: string): AccountEntity[] {

        const currentEntity: AccountEntity[] = this.accountRepository.findByCustomer(customerId)

        return currentEntity
      }

      //Entreverada la mano??
      updateAccount(accountId: string, newAccountData: AccountDTO) : AccountEntity{

        const currentEntity = this.accountRepository.findOneById(accountId);

        const accountTypeEntity = new AccountTypeEntity();
        accountTypeEntity.id = newAccountData.accountType;

        const newAccountEntity = new AccountEntity();
        newAccountEntity.accountTypeId = accountTypeEntity;

        const newCustomerEntity = new CustomerEntity();
        newCustomerEntity.id = newAccountData.customerId;
        

        currentEntity.balance = newAccountData.balance;
        currentEntity.state = newAccountData.state;

        return this.accountRepository.update(accountId, newAccountEntity);
    
      }


      findOneById(accountId: string): AccountEntity {
        
        return this.getAccount(accountId);
      }


      getById(accountId : string):AccountEntity{

        const accountEntity = this.accountRepository.findOneById(accountId); 
    
        return accountEntity;
      }
      

}
