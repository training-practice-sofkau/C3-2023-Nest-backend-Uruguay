import { Injectable } from '@nestjs/common';
import { DepositDto } from 'src/business/dtos';
import { DepositEntity, PaginationModel, DataRangeModel } from 'src/Data';
import { AccountEntity, DepositRepository } from 'src/Data/persistence';
import { AccountService } from '../account/account.service';
import { AccountRepository } from '../../../Data/persistence/repositories/account.repository';



@Injectable()
export class DepositService {
  constructor(private readonly DepositRepository: DepositRepository,private readonly AccountService: AccountService,private readonly AccountRepository: AccountRepository ) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositDto): DepositEntity {
    const newDeposit = new DepositEntity();
    const account = this.AccountRepository.searchByAttributesforOne('id', deposit.accountId)
    newDeposit.accountid = new AccountEntity()
    newDeposit.accountid.accountType  = account.accountType      
    newDeposit.amount = deposit.amount;
    newDeposit.date_time = new Date();
    newDeposit.state = true;
    newDeposit.accountid.id  = deposit.accountId      

    console.log(newDeposit);
    this.AccountService.addBalance(deposit.accountId, deposit.amount)
    return this.DepositRepository.register(newDeposit);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string, soft?: boolean): void {
    this.DepositRepository.delete(depositId, soft);
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
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    let deposit = this.DepositRepository.findByAccountId(depositId);

    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      deposit = deposit.filter(
        (deposit) =>
          deposit.date_time >= dateInit &&
          deposit.date_time <= dateEnd,
      );
    }

    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      deposit = deposit.slice(offset, offset + limit);
    }
    return deposit;
  }
   getAll()
   { 
    return this.DepositRepository.findAll()
   }
  
}
