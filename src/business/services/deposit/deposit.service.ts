import { Injectable } from '@nestjs/common';
import { DataRangeModel } from 'src/data/models/dataRange.model';
import { DepositEntity } from 'src/data/persistence';
import { DepositRepository } from '../../../data/persistence/repositories/deposit.repository';
import { depositDto } from '../../dtos/deposit.dto';
import { AccountEntity } from '../../../data/persistence/entities/account.entity';
import { PaginationDto } from '../../dtos/pagination.dto';
import { DataRangeDto } from 'src/business/dtos/datarange.dto';

@Injectable()
export class DepositService {

    constructor(
        private readonly depositRepocitory: DepositRepository
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
        const newAccount = new AccountEntity
        newAccount.id = deposit.account_id
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
        depositId: string,
        pagination?: PaginationDto,
        dataRange?: DataRangeDto,
    ): DepositEntity[] {
        /*let deposit = this.depositRepocitory.findAll

        if (pagination)
            let { offset = 0, limit = 0 } = pagination;
        deposit = deposit.slice(offset, offset + limit);
*/
        return []
    }

}
