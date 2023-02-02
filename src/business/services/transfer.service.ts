import { Injectable } from '@nestjs/common';
import { TransferEntity, TransferRepository } from '../../data/persistence';
import { DateRangeDto, PaginationDto } from '../../business/dtos';

@Injectable()
export class TransferService {

  constructor(private readonly transferRepository: TransferRepository) {}

  createTransfer(transfer: TransferEntity): TransferEntity {
    return this.transferRepository.register(transfer);
  }

  getHistoryOut(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DateRangeDto,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findOutcomeByDataRange(accountId, dataRange?.dateInit, dataRange?.dateEnd, pagination);
    } else return this.transferRepository.findByOutcomeId(accountId, pagination);
  }

  getHistoryIn(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DateRangeDto,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange?.dateInit, dataRange?.dateEnd, pagination);
    } else return this.transferRepository.findByIncomeId(accountId, pagination);
  }

  getHistory(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DateRangeDto,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange?.dateInit, dataRange?.dateEnd, pagination).concat(this.transferRepository.findOutcomeByDataRange(accountId, dataRange?.dateInit, dataRange?.dateEnd, pagination));
    } else return this.transferRepository.findByIncomeId(accountId, pagination).concat(this.transferRepository.findByOutcomeId(accountId, pagination));
  }

  deleteTransfer(transferId: string): boolean {
    const current = this.transferRepository.findOneById(transferId);
    if (current){
      try{
        this.transferRepository.delete(transferId);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }
}