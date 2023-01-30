import { BadRequestException, Injectable } from '@nestjs/common';

import { AccountRepository, AccountTypeRepository } from '../persistence';
import { AccountModel } from '../models';
import { AccountEntity, AccountTypeEntity } from '../persistence/entities';

// Data Transfer Object
import { BalanceDto } from '../dtos/balance.dto';

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

  addBalance(balance: BalanceDto): void {
    const current = this.accountRepository.findOneById(balance.accountId);
    current.balance += Math.abs(+balance.amount);
    this.accountRepository.update(balance.accountId, current);
  }

  removeBalance(balance: BalanceDto): void {
    const current = this.accountRepository.findOneById(balance.accountId);
    current.balance -= +balance.amount;
    if (current.balance < 0) this.accountRepository.update(balance.accountId, current); else throw new BadRequestException();
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