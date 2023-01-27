import { Injectable } from '@nestjs/common';
import { DepositModel } from '../../models/deposit.model';
import { DepositEntity } from '../../persistence/entities/deposit.entity';
import { PaginationModel } from '../../models/pagination-model.model';
import { DataRangeModel } from 'src/models/data-range.model';
import { DepositRepository } from '../../persistence/repositories/deposit.repository';
import { AccountService } from '../account/account.service';

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
  createDeposit(deposit: DepositModel): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = deposit.account;
    newDeposit.amount = deposit.amount;
    newDeposit.amount = Date.now();

    return this.depositRepository.register(newDeposit);
  }

  findAll(pagination: PaginationModel): DepositEntity[] {
    return this.depositRepository.findAll(pagination);
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
    dataRange?: DataRangeModel,
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

  getAccountHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {    
    dataRange = {
      ... {dateStart: 0, dateEnd: Date.now()},
      ... dataRange
    }

    return this.depositRepository.findByAccountIdAndDataRange(pagination , accountId, dataRange.dateStart, dataRange.dateEnd);
  }

  private getDeposit(depositId: string): DepositEntity {
    return this.depositRepository.findOneById(depositId);
  }
}
