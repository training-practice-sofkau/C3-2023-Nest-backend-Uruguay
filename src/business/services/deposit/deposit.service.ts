import { Injectable } from '@nestjs/common';

import { AccountEntity, DataRangeModel, DepositEntity, DepositRepository, PaginationModel } from '../../../data';
import { CreateDepositDto } from '../../dtos';


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
  createDeposit(deposit: CreateDepositDto): DepositEntity {
    const accountId = new AccountEntity
    accountId.id = deposit.accountId

    const newDeposit = new DepositEntity();
    newDeposit.accountId = accountId;
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = deposit.dateTime
    return this.depositRepository.register(newDeposit);
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
    let history: Array<DepositEntity> = []
    history = this.depositRepository.findByAccountId(depositId);
    return history;
  }
}