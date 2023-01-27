import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/models/pagination.model';
import { DepositEntity } from 'src/persistence';

import { DepositModel } from '../../models/';
import { DepositRepository } from '../../persistence/repositories/deposit.repository';

@Injectable()
export class DepositService {
  [x: string]: any;
  constructor(
    private readonly DepositRepository: DepositRepository,
  ) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
   return this.DepositRepository.createDeposit(deposit);

  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
   this.DepositRepository.delete(depositId)
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
     let deposit =  this.DepositRepository.searchDeposit("id", depositId)

     if(pagination){
      const {offset, limit } = pagination
      deposit = deposit.slice(offset, offset + limit );      
     }
     return deposit
  }
}