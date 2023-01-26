import { AccountTypeEntity } from '../../entities/account-type.entity';
import { ICRUD } from './base/CRUD.interface';

export interface AccountTypeRepositoryInterface extends ICRUD<AccountTypeEntity>{}