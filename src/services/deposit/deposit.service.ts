import { Injectable } from '@nestjs/common';
import { DepositRepository } from 'src/persistence';

import { PaginationModel } from '../../models/';
import { depositEntity } from '../../persistence/entities/deposit.entity';

@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
    throw new Error('This method is not implemented');
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
   
    this.deleteDeposit(depositId)
    // this.accountRepository.delete(accountId)
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} depositId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(depositId: string,pagination?: PaginationModel,dataRange?: DataRangeModel,): DepositEntity[] {
    
  }
}