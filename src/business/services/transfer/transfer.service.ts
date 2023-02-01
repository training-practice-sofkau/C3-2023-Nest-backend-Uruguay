import { Injectable } from '@nestjs/common';

import { DataRangeModel, PaginationModel, TransferModel } from '../../../data/models';
import { TransferEntity } from '../../../data/persistence/entities';
import { TransferRepository } from '../../../data/persistence/repositories';

@Injectable()
export class TransferService {
  constructor(private readonly transferRepository: TransferRepository) {}

  /**
   * Crear una transferencia entre cuentas del banco
   */
  // createTransfer(transfer: TransferDto): TransferEntity {
  //   this.transferRepository.register(transfer);
  //   return transfer;
  // }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   */
  getHistoryOut(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    let transfers = this.transferRepository.findAll();
    let transfersOfAccount = transfers.filter(transfer => transfer.outcome.id === accountId)
    let transfersPaginated: TransferEntity[] = [];

    if(pagination) {
      return transfersPaginated = transfersOfAccount.slice(pagination.offset, pagination.limit);
    }
    return transfersOfAccount;
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   */
  getHistoryIn(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    let transfers = this.transferRepository.findAll();
    let transfersOfAccount = transfers.filter(transfer => transfer.income.id === accountId)
    let transfersPaginated: TransferEntity[] = [];

    if(pagination) {
      return transfersPaginated = transfersOfAccount.slice(pagination.offset, pagination.limit);
    }
    return transfersOfAccount;
  }

  /**
   * Obtener historial de transacciones de una cuenta
   */
  getHistory(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    let transfers: TransferEntity[] = [];
    const transterIn = this.getHistoryIn(accountId);
    const transterOut = this.getHistoryOut(accountId);

    transfers = [
      ...transterIn,
      ...transterOut
    ];

    let transfersPaginated: TransferEntity[] = [];

    if(pagination) {
      return transfersPaginated = transfers.slice(pagination.offset, pagination.limit);
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
    this.transferRepository.delete(transferId);
  }

  /**
   * Borrar una transacción de forma lógica
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  softDeleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId, true);
  }
}