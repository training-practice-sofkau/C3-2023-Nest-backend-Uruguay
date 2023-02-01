import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DataRangeModel, PaginationModel } from '../../models';
import { TransferEntity } from '../../../data/persistence/entities';
import { TransferRepository } from '../../../data/persistence/repositories';
import { CreateTransferDto } from '../../dtos';
import { AccountService } from '../account/';

@Injectable()
export class TransferService {

  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService) { }

  /**
   * Make a new transfer between accounts - OK
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: CreateTransferDto): TransferEntity {

    // validate that origin account has enough balance
    if (this.accountService.getBalance(transfer.outcome) >= transfer.amount) {

      //validate account is active
      if (this.accountService.getState(transfer.income)) {

        const newTransfer = new TransferEntity();

        newTransfer.outcome = transfer.outcome;
        newTransfer.income = transfer.income;
        newTransfer.amount = transfer.amount;
        newTransfer.reason = transfer.reason;

        const transferDone = this.transferRepository.register(newTransfer);

        if (transferDone) {

          this.accountService.removeBalance(transfer.outcome, transfer.amount);
          this.accountService.addBalance(transfer.income, transfer.amount);
          return transferDone;
        }
      }
    }

    throw new InternalServerErrorException("Not enough Balance or Destination account inactive. Null Transfer! ");

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

    return this.transferRepository.findBy("outcome", accountId, pagination, dataRange);

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

    return this.transferRepository.findBy("income", accountId, paginator, dataRange);
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

    console.log(accountId)

    let history = this.transferRepository.getAllTransfersById(accountId, pagination, dataRange);

    console.log(history);

    return history;
  }
    

/**
 * Deletes the transfer that matches de given ID - OK
 *
 * @param {string} transferId
 * @memberof TransferService
 */
deleteTransfer(transferId: string, soft ?: boolean): void {

  this.transferRepository.delete(transferId, soft); //TODO: Soft Delete by Default, implement hard/soft selection. 

}
}