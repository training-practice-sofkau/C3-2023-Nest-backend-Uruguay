import { Injectable } from '@nestjs/common';

import { AccountRepository, AccountTypeRepository } from '../../data/persistence';
import { AccountEntity, AccountTypeEntity } from '../../data/persistence/entities';

// Data Transfer Object
import { BalanceDto, ChangeAccountDto, ChangeStateDto } from '../../business/dtos';


@Injectable()
export class AccountService {

  constructor(private readonly accountRepository: AccountRepository, private readonly accountTypeRepository: AccountTypeRepository) {}

  createAccount(account: AccountEntity): AccountEntity {
    return this.accountRepository.register(account);
  }

  getAccountTypeRepo(): AccountTypeRepository {
    return this.accountTypeRepository;
  }

  getBalance(accountId: string): number {
    return this.accountRepository.findOneById(accountId).balance;
  }

  addBalance(balance: BalanceDto): boolean {
    const current = this.accountRepository.findOneById(balance.accountId);
    current.balance += Math.abs(balance.amount);
    try{
      this.accountRepository.update(balance.accountId, current);
      return true;
    } catch {
      return false;
    }
  }

  removeBalance(balance: BalanceDto): boolean {
    const current = this.accountRepository.findOneById(balance.accountId);
    current.balance -= Math.abs(balance.amount);
    try{
      this.accountRepository.update(balance.accountId, current);
      return true;
    } catch {
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

  getAccountTypeById(accountId: string): AccountTypeEntity {
    return this.accountRepository.findOneById(accountId).accountType;
  }

  getAccountTypeWithId(accountTypeId: string): AccountTypeEntity {
    return this.accountTypeRepository.findOneById(accountTypeId);
  }

  changeAccountType(account: ChangeAccountDto): AccountTypeEntity {
    const current = this.accountRepository.findOneById(account.accountId);
    current.accountType = this.accountTypeRepository.findOneById(account.accountTypeId);
    return this.accountRepository.update(account.accountId, current).accountType;
  }

  deleteAccount(accountId: string, soft?: boolean): boolean {
    try{
      this.accountRepository.delete(accountId, soft);
      return true;
    } catch {
      return false;
    }
    
  }
}