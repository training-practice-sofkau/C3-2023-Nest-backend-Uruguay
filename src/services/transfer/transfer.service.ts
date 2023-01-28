
import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataRangeModel } from 'src/models/i-data-range-model';
import { PaginationModel } from 'src/models/i-pagination-model';
import { ITransferModel } from 'src/models/i-transfer-model';
import { TransferEntity } from 'src/persistence/entities/transfer-entity';
import { TransferRepository } from 'src/persistence/repositories/TransferRepo';

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
  createTransfer(transfer: ITransferModel): TransferEntity {
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
    dataRange?: IDataRangeModel,
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
    dataRange?: IDataRangeModel,
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
    dataRange?: IDataRangeModel,
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

