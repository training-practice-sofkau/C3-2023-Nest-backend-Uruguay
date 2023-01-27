import { ICRUD } from './base/';
import { TransferEntity } from '../../entities/';

export interface TransferRepositoryInterface extends ICRUD<TransferEntity> {

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
      ): TransferEntity[];

      findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
      ): TransferEntity[];
}