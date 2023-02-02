import { Injectable } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { PaginationModel } from 'src/data/models';
import {
  AccountEntity,
  AccountRepository,
  AccountTypeEntity,
  AccountTypeRepository,
  CustomerEntity,
  CustomerRepository,
} from 'src/data/persistence';
import { AccountDTO, CreateAccountDTO } from 'src/business/dtos';
import { TypeDTO } from '../../dtos/type.dto';
import { Subject } from 'rxjs';
import {
  AccountTypeContext,
  CheckingAccountStrategy,
  SavingAccountStrategy,
} from '../../../data/StrategyPattern/AccountType/account-type-strategy';

@Injectable()
export class AccountService {
  private accountSubject = new Subject<AccountEntity>();

  get accountObservable() {
    return this.accountSubject.asObservable();
  }

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createSavingAccount(account: CreateAccountDTO): AccountEntity {
    const customer = this.customerRepository.findOneById(account.customerId);
    const saving = new SavingAccountStrategy();
    const accountTypeContext = new AccountTypeContext(saving);

    const accountType = accountTypeContext.assignAccountTypeStrategy();

    const newAccount = new AccountEntity();
    newAccount.customer = customer;
    newAccount.accountType = accountType;

    this.accountSubject.next(newAccount);
    this.accountTypeRepository.register(accountType);
    return this.accountRepository.register(newAccount);
  }

  createChekingAccount(account: CreateAccountDTO): AccountEntity {
    const customer = this.customerRepository.findOneById(account.customerId);
    const checking = new CheckingAccountStrategy();
    const accountTypeContext = new AccountTypeContext(checking);

    const accountType = accountTypeContext.assignAccountTypeStrategy();

    const newAccount = new AccountEntity();
    newAccount.customer = customer;
    newAccount.accountType = accountType;

    this.accountSubject.next(newAccount);
    this.accountTypeRepository.register(accountType);
    return this.accountRepository.register(newAccount);
  }

  createAccountType(accountTypeDTO: TypeDTO): AccountTypeEntity {
    const newAccountType = new AccountTypeEntity();
    newAccountType.name = accountTypeDTO.name;

    return this.accountTypeRepository.register(newAccountType);
  }

  findAllAccountTypes(pagination: PaginationModel): AccountTypeEntity[] {
    return this.accountTypeRepository.findAll(pagination);
  }

  findAccountType(id: string): AccountTypeEntity {
    return this.accountTypeRepository.findOneById(id);
  }

  findAll(pagination: PaginationModel): AccountEntity[] {
    return this.accountRepository.findAll(pagination);
  }

  findOneById(accountId: string): AccountEntity {
    return this.getAccount(accountId);
  }

  findByCustomer(customerId: string): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    return this.getAccount(accountId).balance;
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    return this.getAccount(accountId).accountType;
  }

  getCustomer(accountId: string): CustomerEntity {
    return this.getAccount(accountId).customer;
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    return this.getAccount(accountId).state;
  }

  updateAccount(accountId: string, newAccount: AccountDTO) {
    let account = this.getAccount(accountId);
    let accountType: AccountTypeEntity;
    if (typeof newAccount.accountType != 'undefined') {
      if (newAccount.accountType === 'Saving Account') {
        const saving = new SavingAccountStrategy();
        const accountTypeContext = new AccountTypeContext(saving);
        account.accountType = accountTypeContext.assignAccountTypeStrategy();
      }

      if (newAccount.accountType === 'Checking Account') {
        const checking = new CheckingAccountStrategy();
        const accountTypeContext = new AccountTypeContext(checking);
        account.accountType = accountTypeContext.assignAccountTypeStrategy();
      }
    }

    if (typeof newAccount.balance != 'undefined')
      account.balance = newAccount.balance;
    if (typeof newAccount.state != 'undefined')
      account.state = newAccount.state;

    return this.accountRepository.update(accountId, account);
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, addBalance: AccountDTO): void {
    const account = this.getAccount(accountId);

    if (typeof addBalance.balance != 'undefined')
      account.balance += addBalance.balance;

    this.accountRepository.update(accountId, account);
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
    let account = this.getAccount(accountId);
    
    if (account.accountType.name === 'Saving Account') {
      const checking = new CheckingAccountStrategy();
      const accountTypeContext = new AccountTypeContext(checking);
      account.accountType = accountTypeContext.assignAccountTypeStrategy();
    } 
    else if (account.accountType.name === 'Checking Account') {
      const saving = new SavingAccountStrategy();
      const accountTypeContext = new AccountTypeContext(saving);

      account.accountType = accountTypeContext.assignAccountTypeStrategy();
    }

    this.accountRepository.update(accountId, account);

    return account.accountType;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string): void {
    const account = this.getAccount(accountId);
    if(account.state) {
      account.state = false;
    } else {
      account.state = true;
    }

    this.accountRepository.update(accountId, account);
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string, soft?: boolean): void {
    if (this.getAccount(accountId).balance != 0)
      throw new Error(
        'Cannot Delete this Account. Please transfer your balance to another account',
      );

    if (soft) this.accountRepository.delete(accountId, soft);

    if (!soft) this.accountRepository.delete(accountId);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, newBalance: AccountDTO): void {
    if (typeof newBalance.balance === 'undefined')
      throw new NotAcceptableException();

    if (this.verifyAmountIntoBalance(accountId, newBalance.balance))
      throw new Error('Not enough funds');

    const account = this.getAccount(accountId);
    account.balance -= newBalance.balance;

    this.accountRepository.update(accountId, account);
  }

  cleanBalance(accountId: string): void {
    const account = this.getAccount(accountId);
    account.balance -= account.balance;

    this.accountRepository.update(accountId, account);
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
    if (this.getAccount(accountId).balance < amount) {
      return true;
    }

    return false;
  }

  private getAccount(accountId: string): AccountEntity {
    return this.accountRepository.findOneById(accountId);
  }
}
