import { DepositEntity } from '../../entities/deposit.entity';
import { ICRUD } from './base/CRUD.interface';

export interface DespositRepositoryInterface extends ICRUD<DepositEntity>{}