import { ICRUD } from './base/CRUD.interface';
import { TransferEntity } from '../../entities/transfer.entity';

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