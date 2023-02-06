import { Injectable } from '@nestjs/common';
import { TransferDto } from 'src/business/dtos';
import { TransferEntity, PaginationModel, DataRangeModel } from 'src/Data';
import { TransferRepository } from 'src/Data/persistence';
import { AccountService } from '../account/account.service';


@Injectable()
export class TransferService {
  constructor(private readonly TransferRepository: TransferRepository,private readonly AccountService: AccountService ) {}
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferDto): TransferEntity {
    const newtransfer = new TransferEntity();
    
    newtransfer.outcome = this.AccountService.removeBalance(transfer.outcome.id, transfer.transferAmount)
    newtransfer.income =  this.AccountService.addBalance(transfer.income.id, transfer.transferAmount)
    newtransfer.transferAmount = transfer.transferAmount
    newtransfer.transferReason = transfer.transferReason
    newtransfer.state = true;
    console.log(newtransfer)
    return this.TransferRepository.register(newtransfer);
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryOut(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    let transfers;
    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfers = this.TransferRepository.findIncomeByDataRange(accountId, dateInit, dateEnd);
    } else {
      transfers = this.TransferRepository.findOneById(accountId);
    }

    if (dataRange) {
      transfers = transfers.filter(
        (transfer) =>
          transfer.dateTime >= dataRange.dateInit &&
          transfer.dateTime <= dataRange.dateEnd,
      );
    }

    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      transfers = transfers.slice(offset, offset + limit);
    }
    return transfers;
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    let transfers;
    transfers = this.TransferRepository.findOneById(accountId);
        
    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      transfers = transfers.slice(offset, offset + limit);
    }

    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfers = transfers.filter(
        (transfer) =>
          transfer.dateTime >= dateInit &&
          transfer.dateTime <= dateEnd,
      );
    }

    return transfers;
  }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    let transfers;
    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfers = this.TransferRepository.findOutcomeByDataRange(accountId, dateInit, dateEnd);
    } else {
      transfers = this.TransferRepository.findOneById(accountId);
    }

    if (dataRange) {
      transfers = transfers.filter(
        (transfer) =>
          transfer.dateTime >= dataRange.dateInit &&
          transfer.dateTime <= dataRange.dateEnd,
      );
    }

    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      transfers = transfers.slice(offset, offset + limit);
    }
    return transfers;
  }


  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.TransferRepository.delete(transferId);
  }
}
