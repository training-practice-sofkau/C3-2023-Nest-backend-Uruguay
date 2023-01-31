import { Injectable } from '@nestjs/common';

import { DepositEntity, DepositRepository } from '../../data/persistence';
import { CreateDepositDto, HistoryDto, PaginationDto } from '../../business/dtos';
import { AccountService } from '.';

@Injectable()
export class DepositService {

  constructor(private readonly depositRepository: DepositRepository, private readonly accountService: AccountService) {}

  createDeposit(deposit: CreateDepositDto): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = this.accountService.getAccountById(deposit.accountId);
    newDeposit.amount = +deposit.balance;
    newDeposit.dateTime = newDeposit.dateTime || Date.now();
    return this.depositRepository.register(newDeposit);
  }

  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId);
  }

  getHistory(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: HistoryDto,
  ): DepositEntity[] {
    if (dataRange){
      return this.depositRepository.findByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination);
    } else return this.depositRepository.findByAccountId(accountId, pagination);
  }
}