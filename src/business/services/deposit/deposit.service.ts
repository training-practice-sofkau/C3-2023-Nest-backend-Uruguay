import { Injectable } from '@nestjs/common';

import { DataRangeModel, PaginationModel } from '../../../data/models/';
import { AccountRepository, DepositRepository } from '../../../data//persistence/repositories';
import { DepositEntity } from '../../../data/persistence/entities';
import { DepositDto } from '../../dtos';

@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountRepository: AccountRepository) {}

  /**
   * Crear un deposito
   */
  createDeposit(deposit: DepositDto): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = this.accountRepository.findOneById(deposit.account);
    newDeposit.amount = deposit.amount;

    return this.depositRepository.register(newDeposit);
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
  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId);
  }
  
  /**
   * Borrar un deposito de forma lógica
   */
  softDeleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId, true);
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   */
  getHistory(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {

    let deposits = this.depositRepository.findAll();
    let depositsOfAccount = deposits.filter(deposit => deposit.account.id === accountId)
    let depositsFiltered = depositsOfAccount;

    if(pagination) {
      depositsFiltered = depositsFiltered.slice(pagination.offset, pagination.limit);
    }

    if(dataRange) {
      if(typeof dataRange.offset === 'number') dataRange.offset = new Date(dataRange.offset);
      if(typeof dataRange.limit === 'number') dataRange.limit = new Date(dataRange.limit);
      
      depositsFiltered = depositsFiltered.filter(
        (deposit) => deposit.dateTime >= dataRange.offset && deposit.dateTime <= dataRange.limit);
    }
    return depositsOfAccount;
  }

  getHistoryByAccountId(accountId: string): DepositEntity[] {
    return this.depositRepository.findByAccountId(accountId);
  }

  getHistoryByDataRange(dateInit: Date | number, dateEnd: Date | number): DepositEntity[] {
    return this.depositRepository.findByDataRange(dateInit, dateEnd);
  }
}