import { Injectable } from '@nestjs/common';

import { PaginationModel, DataRangeModel } from '../models';
import { DepositEntity, DepositRepository } from '../persistence';
import { CreateDepositDto } from '../dtos';
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
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    if (dataRange){
      return this.depositRepository.findByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination);
    } else return this.depositRepository.findByAccountId(accountId, pagination);
  }
}

function uuid(): string {
  throw new Error('Function not implemented.');
}
