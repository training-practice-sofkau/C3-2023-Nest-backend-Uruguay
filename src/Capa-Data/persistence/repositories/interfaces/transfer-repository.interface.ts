import { BaseRepositoryInterface } from './base';
import { transferEntity } from '../../entities/transfer.entity';

export type TransferRepositoryInterface =
  BaseRepositoryInterface<transferEntity>;
