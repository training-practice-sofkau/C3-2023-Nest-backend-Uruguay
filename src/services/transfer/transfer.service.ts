import { Injectable } from '@nestjs/common';

import { DataRangeModel, PaginationModel } from '../../models';
import { TransferEntity } from '../../persistence/entities';
import { TransferRepository } from '../../persistence/repositories';
import { CreateTransferDto } from '../../dtos';

@Injectable()
export class TransferService {

  constructor(private readonly transferRepository: TransferRepository) {}

  /**
   * Make a new transfer between accounts - OK
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: CreateTransferDto): TransferEntity {

    const newTransfer = new TransferEntity();

    newTransfer.outcome = transfer.outcome;
    newTransfer.income = transfer.income;
    newTransfer.amount = transfer.amount;
    newTransfer.reason = transfer.reason;
        
    return this.transferRepository.register(newTransfer);

  }

  /**
   * Get the historical data of Out transfers from one account - OK
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryOut(accountId: string, 
                pagination?: PaginationModel<TransferEntity>, 
                dataRange?: DataRangeModel): TransferEntity[] {

    let history = [];

    history = this.transferRepository.findBy("outcome",accountId, pagination, dataRange);    

    return history;

  }

  /**
   * Get the historical data of In transfers from one account - OK
   *
   * @param {string} accountId
   * @param {PaginationModel} paginator
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(accountId: string, 
              paginator?: PaginationModel<TransferEntity>, 
              dataRange?: DataRangeModel): TransferEntity[] {
    
    let history = [];

    history = this.transferRepository.findBy("income",accountId, paginator, dataRange);    

    return history;
  }

  /**
   * Get the historical data of transfers from one account - OK
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(accountId: string, 
            pagination?: PaginationModel<TransferEntity>, 
            dataRange?: DataRangeModel): TransferEntity[] {
    
    let history = [];

    history = this.getHistoryOut(accountId, pagination, dataRange).concat(this.getHistoryIn(accountId, pagination, dataRange));    

    return history;

  }

  /**
   * Deletes the transfer that matches de given ID - OK
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
        
    this.transferRepository.delete(transferId, true); //TODO: Soft Delete by Default, implement hard/soft selection. 
    
  }
}