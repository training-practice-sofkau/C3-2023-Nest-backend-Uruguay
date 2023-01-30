import { Injectable } from '@nestjs/common';
import { TransferEntity, TransferRepository } from '../persistence';
import { CreateTransferDto, HistoryDto, PaginationDto } from '../dtos';
import { AccountService } from '.';

@Injectable()
export class TransferService {

  constructor(private readonly transferRepository: TransferRepository, private readonly accountService: AccountService) {}

  createTransfer(transfer: CreateTransferDto): TransferEntity {
    const newTransfer = new TransferEntity();
    newTransfer.income = this.accountService.getAccountById(transfer.incomeId);
    newTransfer.outcome = this.accountService.getAccountById(transfer.outcomeId);
    newTransfer.balance = +transfer.balance;
    newTransfer.dateTime = transfer.dateTime || Date.now();
    newTransfer.reason = transfer.reason;
    return this.transferRepository.register(newTransfer);
  }

  getHistoryOut(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: HistoryDto,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findOutcomeByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination);
    } else return this.transferRepository.findByOutcomeId(accountId, pagination);
  }

  getHistoryIn(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: HistoryDto,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination);
    } else return this.transferRepository.findByIncomeId(accountId, pagination);
  }

  getHistory(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: HistoryDto,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination).concat(this.transferRepository.findOutcomeByDataRange(accountId, dataRange.dateInit, dataRange.dateEnd, pagination));
    } else return this.transferRepository.findByIncomeId(accountId, pagination).concat(this.transferRepository.findByOutcomeId(accountId, pagination));
  }

  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId);
  }
}