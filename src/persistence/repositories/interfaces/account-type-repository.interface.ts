import { AccountTypeEntity } from '../../entities/account_type.entity';
import { ICRUD } from './base/CRUD.interface';

export interface AccountTypeRepositoryInterface extends ICRUD<AccountTypeEntity>{}