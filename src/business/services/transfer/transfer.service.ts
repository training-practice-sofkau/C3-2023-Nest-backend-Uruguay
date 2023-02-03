import { Injectable } from '@nestjs/common';

import { DataRangeModel, PaginationModel } from '../../../data/models';
import { TransferEntity } from '../../../data/persistence/entities';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';
import { TransferRepository,  } from '../../../data/persistence/repositories';
import { TransferDto, UpdateTransferDto } from '../../../business/dtos';
import { AccountService } from '../../services';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountRepository: AccountRepository,
    private readonly accountService: AccountService) {}

  /**
   * Crear una transferencia entre cuentas del banco
   */
  createTransfer(transfer: TransferDto): TransferEntity {
    const newTransfer = new TransferEntity();
    newTransfer.income = this.accountRepository.findOneById(transfer.income);
    newTransfer.outcome = this.accountRepository.findOneById(transfer.outcome);
    newTransfer.amount = transfer.amount;
    newTransfer.reason = transfer.reason;

    this.transferRepository.register(newTransfer);
    
    this.accountService.addBalance(transfer.income, transfer.amount);
    this.accountService.removeBalance(transfer.outcome, transfer.amount);

    return newTransfer;
  }

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
    let transfersFiltered = transfersOfAccount;

    if(pagination) {
      transfersFiltered = transfersFiltered.slice(pagination.offset, pagination.limit);
    }
    
    if(dataRange) {
      if(typeof dataRange.offset === 'number') dataRange.offset = new Date(dataRange.offset);
      if(typeof dataRange.limit === 'number') dataRange.limit = new Date(dataRange.limit);

      transfersFiltered = transfersFiltered.filter(
        (transfer) => transfer.dateTime >= dataRange.offset && transfer.dateTime <= dataRange.limit
      )
    }
    return transfersFiltered;
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
    let transfersFiltered = transfersOfAccount;

    if(pagination) {
      transfersFiltered = transfersFiltered.slice(pagination.offset, pagination.limit);
    }
    
    if(dataRange) {
      if(typeof dataRange.offset === 'number') dataRange.offset = new Date(dataRange.offset);
      if(typeof dataRange.limit === 'number') dataRange.limit = new Date(dataRange.limit);

      transfersFiltered = transfersFiltered.filter(
        (transfer) => transfer.dateTime >= dataRange.offset && transfer.dateTime <= dataRange.limit
      )
    }
    return transfersFiltered;
  }

  /**
   * Obtener historial de transacciones de una cuenta
   */
  getHistory(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    let transfersAccount: TransferEntity[] = [];
    const transterIn = this.getHistoryIn(accountId);
    const transterOut = this.getHistoryOut(accountId);

    transfersAccount = [
      ...transterIn,
      ...transterOut
    ];

    let transfersFiltered = transfersAccount;

    if(pagination) {
      transfersFiltered = transfersFiltered.slice(pagination.offset, pagination.limit);
    }
    
    if(dataRange) {
      if(typeof dataRange.offset === 'number') dataRange.offset = new Date(dataRange.offset);
      if(typeof dataRange.limit === 'number') dataRange.limit = new Date(dataRange.limit);

      transfersFiltered = transfersFiltered.filter(
        (transfer) => transfer.dateTime >= dataRange.offset && transfer.dateTime <= dataRange.limit
      )
    }
    return transfersFiltered;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): string {
    return this.transferRepository.delete(transferId);
  }

  /**
   * Borrar una transacción de forma lógica
   */
  softDeleteTransfer(transferId: string): string {
    return this.transferRepository.delete(transferId, true);
  }


updateTransfer(id: string, dto: UpdateTransferDto): TransferEntity {
    let transferUpdated = this.transferRepository.findOneById(id);

    if(dto.amount) transferUpdated.amount = dto.amount;
    if(dto.income) transferUpdated.income = this.accountRepository.findOneById(dto.income);
    if(dto.outcome) transferUpdated.outcome = this.accountRepository.findOneById(dto.outcome);
    if(dto.reason) transferUpdated.reason = dto.reason;

    return transferUpdated;
}

getAllTransfers(): TransferEntity[] {
    return this.transferRepository.findAll();
}

findOneTransferById(id: string): TransferEntity {
    return this.transferRepository.findOneById(id);
}

findTransfersOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
): TransferEntity[] {
    return this.transferRepository.findOutcomeByDataRange(accountId, dateInit, dateEnd);
}

findTransfersIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
): TransferEntity[] {
    return this.transferRepository.findIncomeByDataRange(accountId, dateInit, dateEnd);
}
}