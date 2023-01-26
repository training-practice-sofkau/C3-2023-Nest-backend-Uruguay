import { DepositEntity } from '../../entities/deposit.entity';
import { ICRUD } from './base/CRUD.interface';

export interface DespositRepositoryInterface extends ICRUD<DepositEntity> {
    findByAccountId(accountId: string): DepositEntity[];

    findByDataRange(
        dateInit: Date | number,
        dateEnd: Date | number,
      ): DepositEntity[];
}