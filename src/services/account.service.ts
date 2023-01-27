import { BadRequestException, Injectable } from '@nestjs/common';

import { AccountRepository, AccountTypeRepository } from '../persistence';
import { AccountModel } from '../models';
import { AccountEntity, AccountTypeEntity } from '../persistence/entities';

@Injectable()
export class AccountService {

  constructor(private readonly accountRepository: AccountRepository, private readonly accountTypeRepository: AccountTypeRepository) {}

  createAccount(account: AccountModel): AccountEntity {
    const newAccount = new AccountEntity();
    newAccount.customer = account.customer;
    newAccount.accountType = account.accountType;
    newAccount.balance = 0;
    newAccount.state = false;
    return this.accountRepository.register(newAccount);
  }

  getBalance(accountId: string): number {
    return this.accountRepository.findOneById(accountId).balance;
  }

  addBalance(accountId: string, amount: number): void {
    const current = this.accountRepository.findOneById(accountId);
    current.balance += Math.abs(amount);
    this.accountRepository.update(accountId, current);
  }

  removeBalance(accountId: string, amount: number): void {
    const current = this.accountRepository.findOneById(accountId);
    current.balance -= amount;
    if (current.balance < 0) this.accountRepository.update(accountId, current); else throw new BadRequestException();
  }

  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    const current = this.accountRepository.findOneById(accountId);
    if (current.balance >= amount) return true; else return false;
  }

  getState(accountId: string): boolean {
    return this.accountRepository.findOneById(accountId).state
  }

  changeState(accountId: string, state: boolean): void {
    const current = this.accountRepository.findOneById(accountId);
    current.state = state;
    this.accountRepository.update(accountId, current)
  }

  getAccountType(accountId: string): AccountTypeEntity {
    return this.accountRepository.findOneById(accountId).accountType
  }

  changeAccountType(accountId: string, accountTypeId: string,): AccountTypeEntity {
    const current = this.accountRepository.findOneById(accountId);
    current.accountType = this.accountTypeRepository.findOneById(accountTypeId);
    return this.accountRepository.update(accountId, current).accountType
  }

  deleteAccount(accountId: string, soft?: boolean): void {
    this.accountRepository.delete(accountId, soft);
  }
}