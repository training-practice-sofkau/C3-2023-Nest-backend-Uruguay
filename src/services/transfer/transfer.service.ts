import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { TransferModel } from 'src/models';
import { DataRangeModel } from 'src/models/dataRange.model';
import { PaginationModel } from 'src/models/pagination.model';
import { TranferRepository, TransferEntity } from 'src/persistence';
import { transferDto } from '../../dtos/transfer';
import { AccountService } from '../account';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepocitory: TranferRepository,
    private readonly accountService: AccountService


  ) { }
  /**
     * Crear una transferencia entre cuentas del banco
     *
     * @param {TransferModel} transfer
     * @return {*}  {TransferEntity}
     * @memberof TransferService
     */
  createTransfer(transfer: transferDto): TransferEntity {
    const newTransfer = new TransferEntity
    
    //const newAaccount =

    newTransfer.amount = transfer.amount
    newTransfer.income_id = this.accountService.getId(transfer.income_id)
    newTransfer.outcome_id = this.accountService.getId(transfer.outcome_id)
    newTransfer.reason = transfer.reason
    newTransfer.date_time = Date.now()

    return this.transferRepocitory.register(newTransfer)
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
    pagination?: PaginationDto,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    throw new Error('This method is not implemented');
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
    pagination?: PaginationDto,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    throw new Error('This method is not implemented');
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
    pagination: PaginationDto,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.transferRepocitory.delete(transferId)
  }

}
