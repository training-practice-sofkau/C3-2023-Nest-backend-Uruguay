import { Injectable } from '@nestjs/common';

import { DepositEntity, DepositRepository } from 'src/persistence';

import { DataRangeModel, DepositModel, PaginationModel } from '../../models/';
import { DepositDto } from '../../dtos/deposit.dto';

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
  createDeposit(deposit: DepositDto): DepositEntity {
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
  deleteDeposit(depositId: string, soft?:boolean): void {
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
    if (!dataRange?.max || !dataRange.min) throw new Error("error") 
    const depositArrayByDate = this.depositRepository.findByDataRange(dataRange?.min, dataRange?.max)
    return depositArrayByDate.filter(id => id.id === depositId)
  }
}