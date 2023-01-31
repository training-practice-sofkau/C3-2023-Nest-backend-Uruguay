import { Injectable, NotFoundException } from '@nestjs/common';

import { DataRangeModel, PaginationModel } from '../../models';
import { TransferEntity, TransferRepository } from '../../persistence';
import { CreateTrasferDto } from '../../dtos';
import { AccountEntity } from '../../persistence/entities';

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
  createTransfer(transfer: CreateTrasferDto): TransferEntity {
    const accountOutcomeId = new AccountEntity
    accountOutcomeId.id = transfer.outcome

    const accountIncomeId = new AccountEntity
    accountIncomeId.id = transfer.income

    const newTransfer = new TransferEntity();
    newTransfer.outcome = accountOutcomeId;
    newTransfer.income = accountIncomeId;
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