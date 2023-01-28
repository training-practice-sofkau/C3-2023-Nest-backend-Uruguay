import { Injectable } from '@nestjs/common';
import { TransferEntity } from 'src/persistence';
import { TransferRepository } from '../../persistence/repositories/transfer.repository';
import { PaginationModel } from 'src/models/pagination.model';
import { DataRangeModel } from 'src/models/DataRange.Model';
import { timeStamp } from 'console';
import { TransferModel } from 'src/models';

@Injectable()
export class TransferService {
  constructor(
      
    private readonly TransferRepository: TransferRepository,
  ) {}
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferModel): TransferEntity {
    const newtransfer = new  TransferEntity();
    newtransfer.outcome = transfer.outcome
    newtransfer.transferAmount = transfer.transferAmount;
    newtransfer.state = true;
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
    let transfer = this.TransferRepository.searchByAttributes('id', accountId);

    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfer = transfer.filter(
        (transfer) =>
        transfer.dateTime.getTime() >= dateInit &&
        transfer.dateTime.getTime() <= dateEnd,
      );
    }
    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      transfer = transfer.slice(offset, offset + limit);
    }
    return transfer;
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
  ): TransferEntity[]  {
    let transfer = this.TransferRepository.searchByAttributes('id', accountId);
    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfer = transfer.filter(
        (transfer) =>
        transfer.dateTime.getTime() >= dateInit &&
        transfer.dateTime.getTime() <= dateEnd,
      );
    }
    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      transfer = transfer.slice(offset, offset + limit);
    }
    return transfer;
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
  ): TransferEntity[]  {
    let transfer = this.TransferRepository.searchByAttributes('id', accountId);
    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfer = transfer.filter(
        (transfer) =>
        transfer.dateTime.getTime() >= dateInit &&
        transfer.dateTime.getTime() <= dateEnd,
      );
    }
    
    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      transfer = transfer.slice(offset, offset + limit);
    }
    return transfer;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.TransferRepository.delete(transferId)
  }
}