import { Injectable } from '@nestjs/common';
import { DepositModel } from 'src/models';
import { DataRangeModel } from 'src/models/dataRange.model';
import { PaginationModel } from 'src/models/pagination.model';
import { DepositEntity } from 'src/persistence';
import { DepositRepository } from '../../persistence/repositories/deposit.repository';

@Injectable()
export class DepositService {

    constructor(
        private readonly depositRepocitory: DepositRepository

        ){}

    /**
   * Crear un deposito
   * 
   * 
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
createDeposit(deposit: DepositModel): DepositEntity {
    const newDeposit = new DepositEntity()
    newDeposit.account_id = deposit.account_id
    newDeposit.amount = deposit.amount
    newDeposit.date_time = Date.now()
    return this.depositRepocitory.register(newDeposit); 
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.depositRepocitory.delete(depositId) 
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

    
    throw new Error('This method is not implemented');
  }

}
