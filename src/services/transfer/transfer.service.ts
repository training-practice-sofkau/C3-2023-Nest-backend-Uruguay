import { Injectable } from '@nestjs/common';
import { TransferModel } from '../../models/transfer.model';
import { TransferEntity } from '../../persistence/entities/transfer.entity';
import { PaginationModel } from '../../models/pagination-model.model';
import { DataRangeModel } from 'src/models/data-range.model';
import { TransferRepository } from '../../persistence/repositories/transfer.repository';

@Injectable()
export class TransferService {

    constructor(private readonly transferRepository: TransferRepository) {}

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

    return this.transferRepository.register(newTransfer);
  }

  findAll(pagination: PaginationModel): TransferEntity[] {
    return this.transferRepository.findAll(pagination);
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
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {

    dataRange = {
      ... {dateStart: 0, dateEnd: Date.now()},
      ... dataRange
    }

    return this.transferRepository.findOutcomeByDataRange(pagination ,accountId, dataRange.dateStart, dataRange.dateEnd);
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
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {

    dataRange = {
      ... {dateStart: 0, dateEnd: Date.now()},
      ... dataRange
    }

    return this.transferRepository.findIncomeByDataRange(pagination ,accountId, dataRange.dateStart, dataRange.dateEnd);
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
    dataRange = {
      ... {dateStart: 0, dateEnd: Date.now()},
      ... dataRange
    }

    return this.transferRepository.findByAccountIdAndDataRange(pagination ,accountId, dataRange.dateStart, dataRange.dateEnd);
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string, soft?: boolean): void {
    if(soft) this.transferRepository.delete(transferId, soft);
    
    this.transferRepository.delete(transferId);
  }
}
