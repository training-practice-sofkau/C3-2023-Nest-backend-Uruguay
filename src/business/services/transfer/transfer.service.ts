import { Injectable } from '@nestjs/common';
import { TransferEntity, TransferRepository } from 'src/data';
import { DataRangeDto, PaginationDto, TransferDto } from 'src/data/dtos';
import { AccountService } from '../account';

@Injectable()
export class TransferService {
  constructor(private readonly trasnferRepository: TransferRepository,
    private readonly accountService: AccountService) { }

  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferDto): TransferEntity {
    const newTransfer = new TransferEntity()
    const newIncome = this.accountService.getId(transfer.income)
    const newOutcome = this.accountService.getId(transfer.outcome)
    newTransfer.amount = transfer.amount
    newTransfer.income = newIncome
    newTransfer.outcome = newOutcome
    newTransfer.reason = transfer.reason
    newTransfer.dateTime = Date.now()
    return this.trasnferRepository.register(newTransfer)
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeDto} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryOut(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DataRangeDto,
  ): TransferEntity[] {
    if (!dataRange?.min || !dataRange?.max) throw new Error("Error")
    this.trasnferRepository.findOutcomeByDataRange(accountId, dataRange?.min, dataRange?.max, pagination)
    return this.trasnferRepository.findAll()
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeDto} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DataRangeDto,
  ): TransferEntity[] {
    if (!dataRange?.min || !dataRange?.max) throw new Error("Error")
    this.trasnferRepository.findIncomeByDataRange(accountId, dataRange?.min, dataRange?.max, pagination)
    return this.trasnferRepository.findAll()
  }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeDto} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DataRangeDto,
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