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
    let transfer = this.TransferRepository.searchByAttributes(
      'id',
      accountId,
    );    

    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfer = transfer.filter(
        (transfer) =>
        transfer.dateTime >= dateInit &&
        transfer.dateTime <= dateEnd,
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
  ): TransferEntity[] {
    let transfer = this.TransferRepository.searchByAttributes('id', accountId);
    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfer = transfer.filter(
        (transfer) =>
          transfer.dateTime >= dateInit &&
          transfer.dateTime <= dateEnd,
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
  ): TransferEntity[] {
    let transfer = this.TransferRepository.searchByAttributes('id', accountId);
    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      transfer = transfer.filter(
        (transfer) =>
          transfer.dateTime >= dateInit &&
          transfer.dateTime <= dateEnd,
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
    this.TransferRepository.delete(transferId);
  }
}
