import { Injectable } from '@nestjs/common';
import { DepositDto } from 'src/business/dtos';
import { DepositEntity, PaginationModel, DataRangeModel } from 'src/Data';
import { DepositRepository } from 'src/Data/persistence';



@Injectable()
export class DepositService {
  constructor(private readonly DepositRepository: DepositRepository) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositDto): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.amount = deposit.amount;
    newDeposit.date_time = new Date();
    newDeposit.state = true;
    return this.DepositRepository.register(newDeposit);
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
