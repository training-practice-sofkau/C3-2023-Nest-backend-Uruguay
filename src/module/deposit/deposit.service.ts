import { Injectable, NotFoundException } from '@nestjs/common';


import { DepositRepository } from '../../module/deposit/deposit.repository';
import { DepositEntity } from './deposit.entities';
import { AccountService } from '../account/service';
import { DataRangeModel, PaginationModel } from '../base';
import { depositDto } from './dto/deposit.dto';



@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository : DepositRepository,
    private readonly accountService : AccountService){}


  createDeposit(deposit: depositDto): DepositEntity {

    const account = this.accountService.getById(deposit.accountId);

    const newDeposit = new DepositEntity();
    newDeposit.account = account;
    newDeposit.amount = deposit.amount;
    newDeposit.date_time = Date.now();
    
    return this.depositRepository.register(newDeposit);
  }

  findAll(): DepositEntity[] {
    return this.depositRepository.findAll();
  }

  /**
   * Borrar un deposito
   */
  deleteDeposit(depositId: string,sof? : boolean): void {
    if(sof)this.depositRepository.delete(depositId,sof);

    this.depositRepository.delete(depositId);
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   */
  getHistory(depositId: string , pagination?: PaginationModel,dataRange?: DataRangeModel): DepositEntity[] {
    //Lo que me falta es que es de todos los depositos 
    if (!dataRange?.max || !dataRange.min) throw new NotFoundException(); //Arreglar este || 

    const deposit = this.depositRepository.findByDataRange(dataRange.min,dataRange.max);//el historial de todas las cuenta en ese rango
    

    const depo = deposit.filter((depo) => depo.id === depositId);//Mismo rango pero para el id del parametro
    return depo;
  }
}