import { Injectable } from '@nestjs/common';
import { AccountRepository, DepositEntity } from 'src/data/persistence';
import { DepositRepository } from '../../../data/persistence/repositories/deposit.repository';
import { depositDto } from '../../dtos/deposit.dto';
import { AccountEntity } from '../../../data/persistence/entities/account.entity';
import { PaginationDto } from '../../dtos/pagination.dto';
import { DataRangeDto } from 'src/business/dtos/datarange.dto';

@Injectable()
export class DepositService {

    constructor(
        private readonly depositRepocitory: DepositRepository,
        private readonly accountRepocitory: AccountRepository
    ) { }

    /**
   * Crear un deposito
   * 
   * 
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
    createDeposit(deposit: depositDto): DepositEntity {
        const newDeposit = new DepositEntity()
        const newAccount = this.accountRepocitory.findOneById(deposit.account_id)
        newAccount.balance += deposit.amount
        newDeposit.account_id = newAccount
        newDeposit.amount = deposit.amount
        newDeposit.date_time = Date.now()
        
        
        return this.depositRepocitory.register(newDeposit);
    }

    /**
     * Borrar un deposito
     *
     * @param {string} depositId
     * @memberof DepositService
     */
    deleteDeposit(depositId: string): void {
        this.depositRepocitory.delete(depositId)
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
    getHistory(
        accountId: string,
        pagination?: PaginationDto,
        dataRange?: DataRangeDto,
    ): DepositEntity[] {
        if (dataRange){
            return this.depositRepocitory.findByDataRangeById(accountId, dataRange?.Min, dataRange?.Max, pagination);
          } else return this.depositRepocitory.findByAccountId(accountId);
        //return  this.depositRepocitory.findByDataRangeById(depositId, dataRange, pagination?)
    }

}
