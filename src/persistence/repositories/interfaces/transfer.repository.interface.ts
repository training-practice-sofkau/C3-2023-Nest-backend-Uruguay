import { ICRUD } from './base/';
import { TransferEntity } from '../../entities/';
import { PaginationModel } from '../../../models/pagination-model.model';

export interface TransferRepositoryInterface extends ICRUD<TransferEntity> {

    findOutcomeByDataRange(
      pagination: PaginationModel,
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
      ): TransferEntity[];

      findIncomeByDataRange(
        pagination: PaginationModel,
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
      ): TransferEntity[];
}