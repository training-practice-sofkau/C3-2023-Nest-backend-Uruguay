import { Injectable, ExceptionFilter } from '@nestjs/common';
import { DataRangeModel, PaginationModel } from 'src/models';
import { TransferModel } from 'src/models/transfer.model';
import { TransferEntity } from 'src/persistence';
import { TransferRepository } from '../../persistence/repositories/transfer.repository';

@Injectable()
export class TransferService {
  constructor(private readonly trasnferRepository: TransferRepository) { }

  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferModel): TransferEntity {
    const newTransfer = new TransferEntity()
    newTransfer.amount = transfer.amount
    newTransfer.income = transfer.income
    newTransfer.outcome = transfer.outcome
    newTransfer.reason = transfer.reason
    newTransfer.dateTime = Date.now()
    return this.trasnferRepository.register(newTransfer)
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
    if (!dataRange?.min || !dataRange?.max) throw new Error("Error")
    this.trasnferRepository.findOutcomeByDataRange(accountId, dataRange?.min, dataRange?.max)
    return this.trasnferRepository.findAll()
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
    if (!dataRange?.min || !dataRange?.max) throw new Error("Error")
    this.trasnferRepository.findIncomeByDataRange(accountId, dataRange?.min, dataRange?.max)
    return this.trasnferRepository.findAll()
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
    const thisHistory = this.getHistoryIn(accountId, pagination, dataRange)
      .concat(this.getHistoryOut(accountId, pagination, dataRange))
    return thisHistory
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.trasnferRepository.delete(transferId)
  }
}