import { Injectable } from '@nestjs/common';
import { TransferRepository } from './transfer.repository';
import { TransferEntity } from './transfer.entities';
import { TransferModel } from './transfer.model';
import { DataRangeModel } from '../base/dataRange.model';
import { PaginationModel } from '../base';

@Injectable()
export class TransferService {
  constructor(private readonly TransferRepo : TransferRepository){}
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferModel): TransferEntity {
    const newTransfer = new TransferEntity();
    newTransfer.amount = transfer.amount;
    newTransfer.date_time = transfer.date_time;
    newTransfer.delete_at = transfer.delete_at;
    newTransfer.id = transfer.id;
    newTransfer.income = transfer.income;
    newTransfer.outcome = transfer.outcome;
    newTransfer.reason = transfer.reason;
    return this.TransferRepo.register(newTransfer);
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
  getHistoryOut(accountId: string,pagination?: PaginationModel,dataRange?: DataRangeModel): TransferEntity[] {//dataRange:DataRangeModel
    dataRange = {
      ...{min: 0 ,max: Date.now()},
      ...dataRange
    }

    const transferHistory = this.TransferRepo.findOutcomeByDataRange(accountId,dataRange.min,dataRange?.max);
    const transfercuentaHistory = transferHistory.filter((account) => account.id === accountId);
    return transfercuentaHistory;

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
  getHistoryIn(accountId: string,pagination?: PaginationModel,dataRange?: DataRangeModel): TransferEntity[] {//dataRange?: DataRangeModel
    dataRange = {
      ...{min: 0 ,max: Date.now()},
      ...dataRange
    }
    const transferHistory = this.TransferRepo.findIncomeByDataRange(accountId,dataRange?.min,dataRange?.max);
    const transfercuentaHistory = transferHistory.filter((account) => account.id === accountId);
    return transfercuentaHistory;
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
  getHistory(accountId: string,pagination: PaginationModel,dataRange?: DataRangeModel): TransferEntity[] {//dataRange?: 
    let InHisotry = this.getHistoryIn(accountId,pagination,dataRange);
    let outHistory =  this.getHistoryOut(accountId,pagination,dataRange);
    let TotalHistory = InHisotry.concat(outHistory); 
    return TotalHistory;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string , sof? : boolean): void {
    if(sof)this.TransferRepo.delete(transferId,sof);
    this.TransferRepo.delete(transferId);
  }
}