import { Injectable } from '@nestjs/common';

import { DepositEntity, DepositRepository } from '../../data/persistence';
import { BalanceDto, DateRangeDto, PaginationDto } from '../../business/dtos';
import { AccountService } from '.';

@Injectable()
export class DepositService {

  private readonly depositRepository: DepositRepository;

  constructor(private readonly accountService: AccountService) {
    this.depositRepository = DepositRepository.getInstance();
  }


  createDeposit(deposit: DepositEntity): DepositEntity {
    const newBalance = new BalanceDto();
    newBalance.accountId = deposit.account.id;
    newBalance.amount = deposit.amount;
    this.accountService.addBalance(newBalance);
    return this.depositRepository.register(deposit);
  }

  deleteDeposit(depositId: string): boolean {
    const current = this.depositRepository.findOneById(depositId);
    if (current){
      try{
        this.depositRepository.delete(depositId);
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
}