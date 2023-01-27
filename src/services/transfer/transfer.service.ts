import { Injectable } from '@nestjs/common';
import { PaginationModel, transferModel } from 'src/models';
import { Transfer } from 'src/persistence/entities/transfer.entities';
import { TransferRepository } from '../../persistence/repositories/transfer.repository';

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
  createTransfer(transfer: transferModel): Transfer {
    const newTransfer = new Transfer();
    newTransfer.trf_amount = transfer.trf_amount;
    newTransfer.trf_date_time = transfer.trf_date_time;
    newTransfer.trf_delete_at = transfer.trf_delete_at;
    newTransfer.trf_id = transfer.trf_id;
    newTransfer.trf_income = transfer.trf_income;
    newTransfer.trf_outcome = transfer.trf_outcome;
    newTransfer.trf_reason = transfer.trf_reason;
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
  getHistoryOut(accountId: string,pagination?: PaginationModel,dataRange?: string): Transfer[] {//dataRange:DataRangeModel
    const transferHistory = this.TransferRepo.findOutcomeByDataRange(accountId,pagination?.offset,pagination?.limit);
    const transfercuentaHistory = transferHistory.filter((account) => account.trf_id === accountId);
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
  getHistoryIn(accountId: string,pagination?: PaginationModel,dataRange?: string): Transfer[] {//dataRange?: DataRangeModel
    const transferHistory = this.TransferRepo.findIncomeByDataRange(accountId,pagination?.offset,pagination?.limit);
    const transfercuentaHistory = transferHistory.filter((account) => account.trf_id === accountId);
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
  getHistory(accountId: string,pagination: PaginationModel,dataRange?: string): Transfer[] {//dataRange?: DataRangeModel
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
  deleteTransfer(transferId: string): void {
    this.TransferRepo.delete(transferId);
  }
}