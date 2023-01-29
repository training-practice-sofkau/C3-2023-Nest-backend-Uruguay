import { Injectable, NotFoundException } from '@nestjs/common';


import { DepositRepository } from '../../module/deposit/deposit.repository';
import { DataRangeModel } from 'src/module/dataRange.model';
import { DepositEntity } from './deposit.entities';
import { AccountService } from '../account/service';
import { DepositModel } from './deposit.model';
import { PaginationModel } from '../base';


@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository : DepositRepository,
    private readonly accountService : AccountService){}

  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = deposit.account;
    newDeposit.amount = deposit.amount;
    newDeposit.date_time = deposit.date_time;
    newDeposit.delete_at = deposit.delete_at;
    newDeposit.id = deposit.id;
    return this.depositRepository.register(newDeposit);
  }

  findAll(): DepositEntity[] {
    return this.depositRepository.findAll();
  }

  /**
   * Borrar un deposito
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string,sof? : boolean): void {
    if(sof)this.depositRepository.delete(depositId,sof);

    this.depositRepository.delete(depositId);
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} depositId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(depositId: string , pagination?: PaginationModel,dataRange?: DataRangeModel): DepositEntity[] {
    //Lo que me falta es que es de todos los depositos 
    if (!dataRange?.max || !dataRange.min) throw new NotFoundException(); //Arreglar este || 

    const deposit = this.depositRepository.findByDataRange(dataRange.min,dataRange.max);//el historial de todas las cuenta en ese rango
    

    const depo = deposit.filter((depo) => depo.id === depositId);//Mismo rango pero para el id del parametro
    return depo;
  }
}