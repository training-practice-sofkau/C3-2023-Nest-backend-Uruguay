import { ICRUD } from './base/CRUD.interface';
import { TransferEntity } from '../../entities/transfer.entity';

export interface TransferRepositoryInterface extends ICRUD<TransferEntity>{}