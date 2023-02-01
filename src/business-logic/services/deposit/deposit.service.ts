import { Injectable } from '@nestjs/common';
import { CreateDepositDTO } from 'src/business-logic/dtos/create-deposit-dto';
import { PaginationModel } from 'src/data-access/models/i-pagination-model';
import { DepositEntity } from 'src/data-access/entities/deposit-entity';
import { DepositRepository } from 'src/data-access/repositories/DepositRepo';
import { AccountService } from '../account';
import { IDataRangeModel } from 'src/data-access/models/i-data-range-model';

@Injectable()
export class DepositService {

    constructor(private readonly depositRepository: DepositRepository,
      private readonly accountService: AccountService) {}
    
    /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: CreateDepositDTO): DepositEntity {
    const newDeposit = new DepositEntity();

    const account = this.accountService.findOneById(deposit.accountId);
    
    newDeposit.account = account;
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = Date.now();

    return this.depositRepository.register(newDeposit);
  }

  findAll(pagination: PaginationModel): DepositEntity[] {
    return this.depositRepository.findAll();
  }


  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string, soft?: boolean): void {
    if(soft) this.depositRepository.delete(depositId, soft);
    
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

  /*
  * In my opinion this method have an error, because if a make a search by depositId
  * always bring only one instance. Maybe we need an accountId or something like that, to search
  * all the deposits made by an account in a dateRange and with a Pagination.
  */
  getHistory(
    depositId: string,
    pagination?: PaginationModel,
    dataRange?: IDataRangeModel,
  ): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  /**
   * This method in my opinion is better than getHistory method because bring us all the deposit
   * in a range and with pagination
   * 
   * @param accountId 
   * @param pagination 
   * @param dataRange 
   * @returns 
   */

  getAccountHistory(accountId: string,pagination: PaginationModel,dataRange?: IDataRangeModel): DepositEntity[] {    
    dataRange = {... {dateStart: 0, dateEnd: Date.now()},... dataRange}

    return this.depositRepository.findByAccountIdAndDataRange(pagination , accountId, dataRange.dateStart, dataRange.dateEnd);
  }

  private getDeposit(depositId: string): DepositEntity {
    return this.depositRepository.findOneById(depositId);
  }
}
