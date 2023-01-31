import { Injectable } from '@nestjs/common';
import { TransferEntity, TransferRepository } from '../../data/persistence';
import { HistoryDto, PaginationDto } from '../../business/dtos';
import { AccountService } from '.';

@Injectable()
export class TransferService {

  constructor(private readonly transferRepository: TransferRepository, private readonly accountService: AccountService) {}

  createTransfer(transfer: TransferEntity): TransferEntity {
    return this.transferRepository.register(transfer);
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

  deleteTransfer(transferId: string): boolean {
    try{
      this.transferRepository.delete(transferId);
      return true;
    } catch {
      return false;
    }
  }
}