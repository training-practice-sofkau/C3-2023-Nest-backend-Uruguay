import { depositEntity } from 'src/persistence/entities/deposit.entity';
import { BaseRepositoryInterface } from './base';


export interface DepositRepositoryInterface extends BaseRepositoryInterface<depositEntity>{}
