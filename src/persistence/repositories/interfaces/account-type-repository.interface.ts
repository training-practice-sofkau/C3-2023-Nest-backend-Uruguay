import { AccountTypeEntity } from 'src/persistence/entities/account-type.entity';
import { BaseRepositoryInterface } from './base';

export type AccountTypeRepositoryInterface =
  BaseRepositoryInterface<AccountTypeEntity>;
