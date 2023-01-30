import { Injectable } from '@nestjs/common';

import { DepositModel, PaginationModel, DataRangeModel } from '../models';
import { DepositEntity, DepositRepository } from '../persistence';

@Injectable()
export class DepositService {

  constructor(private readonly depositRepository: DepositRepository) {}

  createDeposit(deposit: DepositModel): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = deposit.account;
    newDeposit.amount = 0;
    newDeposit.dateTime = Date.now();
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
