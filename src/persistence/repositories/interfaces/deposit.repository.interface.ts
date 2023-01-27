import { DepositEntity } from '../../entities/';
import { ICRUD } from './base/';

export interface DespositRepositoryInterface extends ICRUD<DepositEntity> {
    findByAccountId(accountId: string): DepositEntity[];

    findByDataRange(
        dateInit: Date | number,
        dateEnd: Date | number,
      ): DepositEntity[];
}