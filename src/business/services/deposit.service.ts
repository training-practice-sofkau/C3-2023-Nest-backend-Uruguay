import { Injectable, NotFoundException } from '@nestjs/common';

import { AccountRepository, DepositEntity, DepositRepository } from '../../data/persistence';
import { CreateDepositDto, DateRangeDto, PaginationDto } from '../../business/dtos';

@Injectable()
export class DepositService {

  private readonly depositRepository: DepositRepository;
  private readonly accountRepository: AccountRepository;

  constructor() {
    this.depositRepository = DepositRepository.getInstance();
    this.accountRepository = AccountRepository.getInstance();
  }

  createDeposit(deposit: CreateDepositDto): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = this.accountRepository.findOneById(deposit.accountId);
    newDeposit.amount = deposit.balance;
    newDeposit.dateTime = deposit.dateTime || Date.now();

    if (newDeposit.account){
      newDeposit.account.balance += Math.abs(deposit.balance);
      this.accountRepository.update(newDeposit.account.id, newDeposit.account);
      return this.depositRepository.register(newDeposit);
    } else throw new NotFoundException();
  }

  deleteDeposit(depositId: string, soft?: boolean): boolean {
    const current = this.depositRepository.findOneById(depositId);
    if (current){
      try{
        this.depositRepository.delete(depositId, soft?.valueOf());
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  getHistory(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DateRangeDto,
  ): DepositEntity[] {
    if (dataRange){
      return this.depositRepository.findByDataRange(accountId, dataRange?.dateInit, dataRange?.dateEnd, pagination);
    } else return this.depositRepository.findByAccountId(accountId, pagination);
  }

  findSoftDeletedDeposits() : DepositEntity[] {
    return this.depositRepository.findSoftDeletedDeposits();
  }

  findAllDeposits(pagination?: PaginationDto) : DepositEntity[] {
    return this.depositRepository.findAll(pagination);
  }
}