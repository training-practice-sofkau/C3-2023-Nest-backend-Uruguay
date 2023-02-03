import { Inject, Injectable, InternalServerErrorException, forwardRef } from '@nestjs/common';
import { TransferRepository } from '../../capaDeDatos/repository/transfer.repository';
import { TransferEntity } from '../../capaDeDatos/entity/transfer.entities';
import { CreateTransferDto } from '../dto/transfer.dto';
import { dataRangeDto } from '../dto/dataRange.dto';
import { paginationDto } from '../dto/Pagination.dto';
import { AccountService } from '../../../account/capaLogicaDeNegocio/service';
import { PaginationModel } from 'src/module/base/models';

@Injectable()
export class TransferService {
  constructor(
    private readonly TransferRepo : TransferRepository,
    private readonly accountServer: AccountService){}
  /**
   * Crear una transferencia entre cuentas del banco
   */
  createTransfer(transfer: CreateTransferDto): TransferEntity {
    const newOucome = this.accountServer.getById(transfer.outcome);
    //O tiene que ser al tipo de cuenta porque aca lo hago con la cuenta directamente
    newOucome.id = transfer.outcome;

    const newIncome = this.accountServer.getById(transfer.income);
    newIncome.id = transfer.income;

    const newTransfer = new TransferEntity();
    newTransfer.outcome = newOucome;
    newTransfer.income = newIncome;
    newTransfer.amount = transfer.amount;
    newTransfer.reason = transfer.reason;
    newTransfer.date_time = Date.now();

    const transferEntity = this.TransferRepo.register(newTransfer);
    
    if(!transferEntity) throw new InternalServerErrorException(`No se pudo realizar la transaccion de forma correcta`);
      
    newOucome.balance -=transfer.amount;
    
    newIncome.balance += transfer.amount;
    
    return transferEntity;
  }

  findAll(): TransferEntity[] {
    return this.TransferRepo.findAll();
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   */
  getHistoryOut(accountId: string,dataRange?: dataRangeDto,pagination?: paginationDto): TransferEntity[] {//dataRange:DataRangeModel
    dataRange = {
      ...{min: 0 ,max: Date.now()},
      ...dataRange
    }


    return this.TransferRepo.findOutcomeByDataRange(accountId, dataRange.min, dataRange.max,pagination);


  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   */
  getHistoryIn(accountId: string,dataRange?: dataRangeDto,pagination?: paginationDto): TransferEntity[] {//dataRange?: DataRangeModel
    dataRange = {
      ...{min: 0 ,max: Date.now()},
      ...dataRange
    }
    const transferHistory = this.TransferRepo.findIncomeByDataRange(
      accountId,dataRange?.min,dataRange?.
      max,pagination);
    const transfercuentaHistory = transferHistory.filter((account) => account.id === accountId);
    return transfercuentaHistory;
  }

  /**
   * Obtener historial de transacciones de una cuenta
   */
  getHistory(accountId: string,dataRange?: dataRangeDto,pagination?: paginationDto): TransferEntity[] {//dataRange?: 
    let InHisotry = this.getHistoryIn(accountId,dataRange,pagination);
    let outHistory =  this.getHistoryOut(accountId,dataRange,pagination);
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