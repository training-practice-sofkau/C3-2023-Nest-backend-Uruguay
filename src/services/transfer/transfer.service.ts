import { Injectable, NotFoundException } from '@nestjs/common';

import { DataRangeModel, PaginationModel, TransferModel } from '../../models';
import { TransferEntity, TransferRepository } from '../../persistence';

@Injectable()
export class TransferService {
  constructor(private readonly transferRepository: TransferRepository) { }
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferModel): TransferEntity {
    const newTransfer = new TransferEntity();
    newTransfer.outcome = transfer.outcome;
    newTransfer.income = transfer.income;
    newTransfer.amount = transfer.amount;
    newTransfer.reason = transfer.reason;
    return this.transferRepository.register(newTransfer);
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
    if (dataRange) {
      return this.transferRepository.findOutcomeByDataRange(accountId, dataRange.dataInit, dataRange.dataFinal);
    } throw new NotFoundException();
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
    if (dataRange) {
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange.dataInit, dataRange.dataFinal);
    } throw new NotFoundException()
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
    if (dataRange){
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange.dataInit, dataRange.dataFinal)
      .concat(this.transferRepository.findOutcomeByDataRange(accountId, dataRange.dataInit, dataRange.dataFinal));
    } throw new NotFoundException()
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId, true);
  }
}