import { Injectable } from '@nestjs/common';
import { PaginationModel, DataRangeModel, TransferModel } from '../models';
import { TransferEntity, TransferRepository } from '../persistence';

@Injectable()
export class TransferService {

  constructor(private readonly transferRepository: TransferRepository) {}

  createTransfer(transfer: TransferModel): TransferEntity {
    const newTransfer = new TransferEntity();
    newTransfer.income = transfer.income;
    newTransfer.outcome = transfer.outcome;
    newTransfer.balance = 0;
    newTransfer.dateTime = Date.now();
    newTransfer.reason = transfer.reason;
    return this.transferRepository.register(newTransfer)
  }

  getHistoryOut(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findOutcomeByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination);
    } else return this.transferRepository.findByOutcomeId(accountId, pagination);
  }

  getHistoryIn(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination);
    } else return this.transferRepository.findByIncomeId(accountId, pagination);
  }

  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination).concat(this.transferRepository.findOutcomeByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination));
    } else return this.transferRepository.findByIncomeId(accountId, pagination).concat(this.transferRepository.findByOutcomeId(accountId, pagination));
  }

  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId);
  }
}