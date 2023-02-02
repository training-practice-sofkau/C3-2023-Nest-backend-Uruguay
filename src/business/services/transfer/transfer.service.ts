import { Injectable } from '@nestjs/common';
import { DataRangeModel, PaginationModel } from 'src/data/models';
import { TransferEntity, TransferRepository } from 'src/data/persistence';
import { CreateTransferDTO } from 'src/business/dtos/create-transfer.dto';
import { AccountService } from '../account';
import { AccountDTO } from '../../dtos/account.dto';


@Injectable()
export class TransferService {

    constructor(private readonly transferRepository: TransferRepository,
      private readonly accountService: AccountService) {}

    /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: CreateTransferDTO): TransferEntity {
    const newTransfer = new TransferEntity();
    const outcome = this.accountService.findOneById(transfer.outcome)
    const income = this.accountService.findOneById(transfer.income)

    const accountDTO = new AccountDTO();
    accountDTO.balance = transfer.amount;
    this.accountService.removeBalance(outcome.id, accountDTO);
    this.accountService.addBalance(income.id, accountDTO);

    newTransfer.outcome = outcome;
    newTransfer.income = income;
    newTransfer.amount = transfer.amount;
    newTransfer.reason = transfer.reason;
    newTransfer.dateTime = Date.now();

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
    offset: number,
    limit?: number,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {

    const pagination: PaginationModel = {offset: offset, limit: limit};

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
    offset: number,
    limit?: number,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {

    const pagination: PaginationModel = {offset: offset, limit: limit};

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
    offset: number,
    limit?: number,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const pagination: PaginationModel = {offset: offset, limit: limit};

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
    
    if(!soft) this.transferRepository.delete(transferId);
  }
}
