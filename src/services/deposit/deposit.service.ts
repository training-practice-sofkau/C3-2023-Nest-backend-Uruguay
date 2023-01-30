import { Injectable } from '@nestjs/common';

import { DepositEntity } from '../../persistence/entities';
import { DataRangeModel, DepositModel, PaginationModel } from '../../models/';
import { DepositRepository } from '../../persistence/repositories';

@Injectable()
export class DepositService {


  constructor(private readonly depositRepository: DepositRepository) { }

  /**
   * Make a new Deposit - OK
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {

    const newDeposit = new DepositEntity();
    
    newDeposit.accountId = deposit.accountId;
    newDeposit.amount = deposit.amount;

    return this.depositRepository.register(deposit);

  }

  /**
   * Deletes the deposit that matches the given ID - OK
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {

    this.depositRepository.delete(depositId, true); //TODO: Soft Delete by Default,  implement hard/soft selection. 
  }

  /**
   * Gets the historical data of an account, can be filter by dates
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dateRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(accountId: string, pagination?: PaginationModel<DepositEntity>, dataRange?: DataRangeModel): DepositEntity[] {

    let history = [];   

    history = this.depositRepository.findBy("accountId", accountId, pagination, dataRange);

    return history;

  }
}