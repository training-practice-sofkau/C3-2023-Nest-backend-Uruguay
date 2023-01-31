import { depositEntity } from 'src/persistence/entities/deposit.entity';
import { BaseRepositoryInterface } from './base';

export type DepositRepositoryInterface = BaseRepositoryInterface<depositEntity>;
