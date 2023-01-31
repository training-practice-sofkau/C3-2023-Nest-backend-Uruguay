import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';

import { AccountRepository, AccountTypeRepository } from '../../data/persistence';
import { AccountEntity, AccountTypeEntity } from '../../data/persistence/entities';
import { CustomerService } from '.';

// Data Transfer Object
import { BalanceDto, ChangeAccountDto, ChangeStateDto } from '../../business/dtos';


@Injectable()
export class AccountService {

  @Inject(forwardRef(() => CustomerService))
  private readonly customerService: CustomerService;

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

  addBalance(balance: BalanceDto): void {
    const current = this.accountRepository.findOneById(balance.accountId);
    current.balance += Math.abs(+balance.amount);
    this.accountRepository.update(balance.accountId, current);
  }

  removeBalance(balance: BalanceDto): void {
    const current = this.accountRepository.findOneById(balance.accountId);
    current.balance -= Math.abs(+balance.amount);
    if (current.balance >= 0) this.accountRepository.update(balance.accountId, current); else throw new BadRequestException();
  }

  verifyAmountIntoBalance(balance: BalanceDto): boolean {
    const current = this.accountRepository.findOneById(balance.accountId);
    if (current.balance >= +balance.amount) return true; else return false;
  }

  getState(accountId: string): boolean {
    return this.accountRepository.findOneById(accountId).state
  }

  changeState(account: ChangeStateDto): void {
    const current = this.accountRepository.findOneById(account.accountId);
    current.state = account.state;
    this.accountRepository.update(account.accountId, current)
  }

  getAccountById(accountId: string): AccountEntity {
    return this.accountRepository.findOneById(accountId)
  }

  getAccountType(accountId: string): AccountTypeEntity {
    return this.accountRepository.findOneById(accountId).accountType
  }

  changeAccountType(account: ChangeAccountDto): AccountTypeEntity {
    const current = this.accountRepository.findOneById(account.accountId);
    current.accountType = this.accountTypeRepository.findOneById(account.accountTypeId);
    return this.accountRepository.update(account.accountId, current).accountType
  }

  deleteAccount(accountId: string, soft?: boolean): void {
    this.accountRepository.delete(accountId, soft);
  }
}