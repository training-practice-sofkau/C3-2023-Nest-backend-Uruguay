import { Injectable } from '@nestjs/common';
import { throwIfEmpty } from 'rxjs';


import { DataRangeModel, PaginationModel, TransferModel } from '../../models';
import { TransferEntity } from '../../persistence/entities';
import { TransferRepository } from '../../persistence/repositories/transfer.repository';

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
  createTransfer(transfer: TransferModel): TransferEntity {
    
    return this.transferRepository.register(transfer);

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
  getHistoryOut(accountId: string, pagination?: PaginationModel, dataRange?: DataRangeModel): TransferEntity[] {

    let historyOut = [];

    historyOut = this.transferRepository.findBy("outcome",accountId);

    return historyOut;

  }

  /**
   * Get the historical data of In transfers from one account - OK
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(accountId: string, pagination?: PaginationModel, dataRange?: DataRangeModel): TransferEntity[] {
    
    let historyIn = [];

    historyIn = this.transferRepository.findBy("income",accountId);

    return historyIn;
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
  getHistory( accountId: string, pagination: PaginationModel, dataRange?: DataRangeModel): TransferEntity[] {
    
    let history = [];

    history = this.getHistoryOut(accountId).concat(this.getHistoryIn(accountId));

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