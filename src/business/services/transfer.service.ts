import { Injectable } from '@nestjs/common';
import { AccountRepository, TransferEntity, TransferRepository } from '../../data/persistence';
import { CreateTransferDto, DateRangeDto, PaginationDto } from '../../business/dtos';

@Injectable()
export class TransferService {

  private readonly transferRepository: TransferRepository;
  private readonly accountRepository: AccountRepository;

  constructor() {
    this.transferRepository = TransferRepository.getInstance();
    this.accountRepository = AccountRepository.getInstance();
  }
  
  createTransfer(transfer: CreateTransferDto): TransferEntity {
    if (this.accountRepository.findOneById(transfer.outcomeId).balance >= transfer.balance) {
        const newTransfer = new TransferEntity();
        newTransfer.balance = transfer.balance;
        newTransfer.income = this.accountRepository.findOneById(transfer.incomeId);
        newTransfer.outcome = this.accountRepository.findOneById(transfer.outcomeId);
        newTransfer.reason = transfer.reason;
        newTransfer.dateTime = transfer.dateTime || Date.now();
        newTransfer.outcome.balance -= Math.abs(transfer.balance);
        this.accountRepository.update(newTransfer.outcome.id, newTransfer.outcome);
        newTransfer.income.balance += Math.abs(transfer.balance);
        this.accountRepository.update(newTransfer.income.id, newTransfer.income);
        return this.transferRepository.register(newTransfer);
    }
    throw new Error('The outcome account dont have the money');
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