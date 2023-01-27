import { Injectable } from '@nestjs/common';

import { DataRangeModel, DepositModel, PaginationModel } from '../../models/';
import { DepositRepository } from 'src/persistence/repositories';
import { DepositEntity } from 'src/persistence/entities';

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
    return this.depositRepository.register(deposit);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId);
  }
  
  /**
   * Borrar un deposito de forma lógica
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  softDeleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId, true);
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
    const deposit = this.depositRepository.findAll();
    let depositPaginated: DepositEntity[] = [];

    if(pagination) {
      depositPaginated = deposit.slice(pagination.offset, pagination.limit);
    }
  }
}