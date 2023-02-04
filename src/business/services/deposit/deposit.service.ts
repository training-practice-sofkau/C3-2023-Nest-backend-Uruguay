import { Injectable } from '@nestjs/common';

import { AccountRepository, DepositRepository } from '../../../data//persistence/repositories';
import { DepositEntity } from '../../../data/persistence/entities';
import { DataRangeDto, DepositDto, PaginationDto } from '../../dtos';

@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountRepository: AccountRepository) {}

  /**
   * Crear un deposito
   */
  createDeposit(deposit: DepositDto): DepositEntity {
    let newDeposit = new DepositEntity();
    newDeposit.account = this.accountRepository.findOneById(deposit.account);
    newDeposit.amount = deposit.amount;

    this.depositRepository.register(newDeposit)
    
    let accountUpdated = newDeposit.account
    accountUpdated.balance += deposit.amount;
    this.accountRepository.update(accountUpdated.id, accountUpdated);

    return newDeposit;
  }

  /**
   * Actualizar un deposito
   */
  updateDeposit(id: string, newDeposit: DepositDto): DepositEntity {
    let depositUpdated = this.depositRepository.findOneById(id);
    if(newDeposit.account) depositUpdated.account = this.accountRepository.findOneById(newDeposit.account);
    if(newDeposit.amount) depositUpdated.amount = newDeposit.amount;
    
    return this.depositRepository.update(id, depositUpdated);
  }

  /**
   * Borrar un deposito
   */
  deleteDeposit(depositId: string): string {
    return this.depositRepository.delete(depositId);
  }
  
  /**
   * Borrar un deposito de forma lógica
   */
  softDeleteDeposit(depositId: string): string {
    return this.depositRepository.delete(depositId, true);
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   */
  getHistory(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DataRangeDto,
  ): DepositEntity[] {

    let deposits = this.depositRepository.findAll();
    let depositsOfAccount = deposits.filter(deposit => deposit.account.id === accountId)
    let depositsFiltered = depositsOfAccount;

    if(pagination?.offset) {
      depositsFiltered = depositsFiltered.slice(pagination.offset, pagination.limit || undefined);;
    }

    if(dataRange?.start && dataRange.end) {
      if(typeof dataRange.start != 'number') dataRange.start = dataRange.start.getTime();
      if(typeof dataRange.end != 'number') dataRange.end = dataRange.end.getTime();

      depositsFiltered = depositsFiltered.filter(
        deposit => deposit.dateTime >= dataRange.start && deposit.dateTime <= dataRange.end
        );
    }
    return depositsFiltered;
  }

  getHistoryByAccountId(accountId: string): DepositEntity[] {
    return this.depositRepository.findByAccountId(accountId);
  }

  getHistoryByDataRange(dateInit: Date | number, dateEnd: Date | number): DepositEntity[] {
    return this.depositRepository.findByDataRange(dateInit, dateEnd);
  }
}