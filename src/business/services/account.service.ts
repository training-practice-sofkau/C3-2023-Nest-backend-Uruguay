import { Injectable } from '@nestjs/common';

import { AccountRepository, AccountTypeRepository, CustomerRepository } from '../../data/persistence';
import { AccountEntity, AccountTypeEntity } from '../../data/persistence/entities';

// Data Transfer Object
import { BalanceDto, ChangeAccountDto, ChangeStateDto, CreateAccountDto, PaginationDto } from '../../business/dtos';


@Injectable()
export class AccountService {
  
  private readonly accountTypeRepository: AccountTypeRepository;
  private readonly accountRepository: AccountRepository;
  private readonly customerRepository: CustomerRepository;

  constructor() {
    this.accountRepository = AccountRepository.getInstance();
    this.accountTypeRepository = AccountTypeRepository.getInstance();
    this.customerRepository = CustomerRepository.getInstance();
  }

  createAccount(account: CreateAccountDto): AccountEntity {
    const newAccount = new AccountEntity();
    const newAccountType = new AccountTypeEntity();
    newAccountType.name = account.accountTypeName;

    newAccount.accountType = newAccountType;
    newAccount.balance = account.balance;
    newAccount.customer = this.customerRepository.findOneById(account.customerId);
    return this.accountRepository.register(newAccount);
  }

  //getAccountTypeRepo(): AccountTypeRepository {
  //  return this.accountTypeRepository;
  //}

  getBalance(accountId: string): number {
    return this.accountRepository.findOneById(accountId).balance;
  }

  addBalance(balance: BalanceDto): boolean {
    const current = this.accountRepository.findOneById(balance.accountId);
    if (current){
      try{
        current.balance += Math.abs(balance.amount);
        this.accountRepository.update(balance.accountId, current);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  removeBalance(balance: BalanceDto): boolean {
    const current = this.accountRepository.findOneById(balance.accountId);
    current.balance -= Math.abs(balance.amount);
    if (current){
      if (current.balance >= 0) {
        this.accountRepository.update(balance.accountId, current);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  verifyAmountIntoBalance(balance: BalanceDto): boolean {
    const current = this.accountRepository.findOneById(balance.accountId);
    if (current.balance >= balance.amount) return true; else return false;
  }

  getState(accountId: string): boolean {
    return this.accountRepository.findOneById(accountId).state;
  }

  changeState(account: ChangeStateDto): boolean {
    const current = this.accountRepository.findOneById(account.accountId);
    current.state = account.state;
    try{
      this.accountRepository.update(account.accountId, current);
      return true;
    } catch {
      return false;
    } 
  }

  getAccountById(accountId: string): AccountEntity {
    return this.accountRepository.findOneById(accountId);
  }

  getAccountByCustomerId(customerId: string): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
  }

  getAccountTypeById(accountId: string): AccountTypeEntity {
    return this.accountRepository.findOneById(accountId).accountType;
  }

  getAccountTypeWithId(accountTypeId: string): AccountTypeEntity {
    return this.accountTypeRepository.findOneById(accountTypeId);
  }

  changeAccountType(account: ChangeAccountDto): AccountTypeEntity {
    const current = this.accountRepository.findOneById(account.accountId);
    const accountType = this.accountTypeRepository.findOneById(account.accountId);
    accountType.name = account.accountTypeName;
    this.accountTypeRepository.update(accountType.id, accountType)

    return this.accountRepository.update(account.accountId, current).accountType;
  }

  deleteAccount(accountId: string, soft?: boolean): boolean {
    const current = this.accountRepository.findOneById(accountId);
    if (current){
      try{
        this.accountRepository.delete(accountId, soft?.valueOf());
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  findSoftDeletedAccounts() : AccountEntity[] {
    return this.accountRepository.findSoftDeletedAccounts();
  }

  findAllAccounts(pagination?: PaginationDto) : AccountEntity[] {
    return this.accountRepository.findAll(pagination);
  }

  findAllAccountTypes(pagination?: PaginationDto) : AccountTypeEntity[] {
    return this.accountTypeRepository.findAll(pagination);
  }
}