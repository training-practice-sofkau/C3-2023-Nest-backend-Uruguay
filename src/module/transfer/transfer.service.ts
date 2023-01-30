import { Injectable } from '@nestjs/common';
import { TransferRepository } from './transfer.repository';
import { TransferEntity } from './transfer.entities';
import { TransferModel } from './transfer.model';
import { DataRangeModel } from '../base/dataRange.model';
import { PaginationModel } from '../base';
import { AccountEntity } from '../account/account.entities';
import { transferDto } from './dto/transfer.dto';

@Injectable()
export class TransferService {
  constructor(private readonly TransferRepo : TransferRepository){}
  /**
   * Crear una transferencia entre cuentas del banco
   */
  createTransfer(transfer: transferDto): TransferEntity {
    const newOucome = new AccountEntity();
    //O tiene que ser al tipo de cuenta porque aca lo hago con la cuenta directamente
    newOucome.id = transfer.outcome;

    const newIncome = new AccountEntity();
    newIncome.id = transfer.income;

    const newTransfer = new TransferEntity();
    newTransfer.outcome = newOucome;
    newTransfer.income = newIncome;
    newTransfer.amount = transfer.amount;
    newTransfer.reason = transfer.reason;
    return this.TransferRepo.register(newTransfer);
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   */
  getHistoryOut(accountId: string,pagination?: PaginationModel,dataRange?: DataRangeModel): TransferEntity[] {//dataRange:DataRangeModel
    dataRange = {
      ...{min: 0 ,max: Date.now()},
      ...dataRange
    }

    const transferHistory = this.TransferRepo.findOutcomeByDataRange(accountId,dataRange.min,dataRange?.max);
    const transfercuentaHistory = transferHistory.filter((account) => account.id === accountId);
    return transfercuentaHistory;

  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   */
  getHistoryIn(accountId: string,pagination?: PaginationModel,dataRange?: DataRangeModel): TransferEntity[] {//dataRange?: DataRangeModel
    dataRange = {
      ...{min: 0 ,max: Date.now()},
      ...dataRange
    }
    const transferHistory = this.TransferRepo.findIncomeByDataRange(accountId,dataRange?.min,dataRange?.max);
    const transfercuentaHistory = transferHistory.filter((account) => account.id === accountId);
    return transfercuentaHistory;
  }

  /**
   * Obtener historial de transacciones de una cuenta
   */
  getHistory(accountId: string,pagination: PaginationModel,dataRange?: DataRangeModel): TransferEntity[] {//dataRange?: 
    let InHisotry = this.getHistoryIn(accountId,pagination,dataRange);
    let outHistory =  this.getHistoryOut(accountId,pagination,dataRange);
    let TotalHistory = InHisotry.concat(outHistory); 
    return TotalHistory;
  }

  /**
   * Borrar una transacción
   */
  deleteTransfer(transferId: string , sof? : boolean): void {
    if(sof)this.TransferRepo.delete(transferId,sof);
    this.TransferRepo.delete(transferId);
  }
}