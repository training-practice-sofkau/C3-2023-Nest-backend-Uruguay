import { DepositEntity } from '../../entities/';
import { ICRUD } from './base/';
import { PaginationModel } from '../../../models/pagination-model.model';

export interface DespositRepositoryInterface extends ICRUD<DepositEntity> {
    findByAccountId(pagination: PaginationModel ,accountId: string): DepositEntity[];

    findByDataRange(
      pagination: PaginationModel,
        dateInit: Date | number,
        dateEnd: Date | number,
      ): DepositEntity[];
}