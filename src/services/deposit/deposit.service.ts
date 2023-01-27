import { Injectable } from '@nestjs/common';

import { DepositEntity, DepositRepository } from 'src/persistence';

import { DataRangeModel, DepositModel, PaginationModel } from '../../models/';

@Injectable()
export class DepositService {

  constructor(private readonly depositRepository: DepositRepository) { }

  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
    const newDeposit = new DepositEntity()
    newDeposit.account = deposit.account
    newDeposit.amount = deposit.amount
    newDeposit.dateTime = Date.now()
    return this.depositRepository.register(newDeposit)
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId)
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
  getHistory(
    depositId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    const depositArrayByDate = this.depositRepository.findByDataRange(depositId, dataRange?.min, dataRange?.max)
    return depositArrayByDate
  }
}