import { Injectable } from '@nestjs/common';
import { DataRangeModel } from 'src/models/DataRange.Model';
import { PaginationModel } from 'src/models/pagination.model';
import { DepositEntity } from 'src/persistence';

import { DepositModel } from '../../models/';
import { DepositRepository } from '../../persistence/repositories/deposit.repository';

@Injectable()
export class DepositService {
  [x: string]: any;
  constructor(private readonly DepositRepository: DepositRepository) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.amount = deposit.amount;
    newDeposit.date_time = new Date();
    newDeposit.state = true;
    return this.accountRepository.register(newDeposit);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.DepositRepository.delete(depositId);
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
    let deposit = this.DepositRepository.searchByAttributes('id', depositId);

    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      deposit = deposit.filter(
        (deposit) =>
          deposit.date_time.getTime() >= dateInit &&
          deposit.date_time.getTime() <= dateEnd,
      );
    }

    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      deposit = deposit.slice(offset, offset + limit);
    }
    return deposit;
  }
}
