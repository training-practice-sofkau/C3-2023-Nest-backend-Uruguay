import { Injectable } from '@nestjs/common';
import { transferEntity, TransferRepository } from '../../persistence';
import { TransferDto } from '../../dtos/transfer.dto';
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
  createTransfer(transfer: TransferDto): transferEntity { 
    const newAccount = new transferEntity();
    newAccount.amount = transfer.amount
    newAccount.inCome = transfer.inCome
    newAccount.outCome = transfer.outCome
    newAccount.reason = transfer.reason
    newAccount.dateTime = transfer.dateTime
  
    return this.transferRepository.register(newAccount);
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

  //>>>>>>>>>>>>>PENDIENTEEE<<<<<<<<<<<
  // getHistoryOut(
  //   accountId: string,
  //   pagination?: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): TransferEntity[] {
  //   let objeto = this.transferRepository.findIncomeByDataRange

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  //>>>>>>>>>>PENDIENTEEE <<<<<<<<<<<
  // getHistoryIn(
  //   accountId: string,
  //   pagination?: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): TransferEntity[] {
  //   throw new Error('This method is not implemented');
  // }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */

  //>>>>>>>>>>>>>>PENDIENTE<<<<<<<<<<<<<<<<<
  // getHistory(
  //   accountId: string,
  //   pagination: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): TransferEntity[] {
  //   throw new Error('This method is not implemented');
  // }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId);
  }
}
