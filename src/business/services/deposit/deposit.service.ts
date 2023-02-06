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
    let depositsOfAccount = this.depositRepository.findByAccountId(accountId);
    let depositsFiltered = depositsOfAccount;

    if(pagination?.offset) {
      depositsFiltered = depositsFiltered.slice(pagination.offset, pagination.limit || undefined);
    }

    if(dataRange?.start && dataRange.end) {
      if(dataRange.start instanceof Date) dataRange.start = dataRange.start.getTime();
      if(dataRange.end instanceof Date) dataRange.end = dataRange.end.getTime();

      depositsFiltered = depositsFiltered.filter(
        deposit => deposit.dateTime >= dataRange.start && deposit.dateTime <= dataRange.end
        );
    }
    return depositsFiltered;
  }

  getAllDeposits(pagination?: PaginationDto): DepositEntity[] {
      let allDeposits = this.depositRepository.findAll();

      let depositsFiltered = allDeposits;
      
      if(pagination?.offset) {
        depositsFiltered = depositsFiltered.slice(pagination.offset, pagination.limit || undefined);
      }

      return depositsFiltered;
  }

  getOneDepositById(depositId: string): DepositEntity {
    return this.depositRepository.findOneById(depositId);
  }

  getHistoryByDataRange(dateInit: Date | number, dateEnd: Date | number): DepositEntity[] {
    return this.depositRepository.findByDataRange(dateInit, dateEnd);
  }
}