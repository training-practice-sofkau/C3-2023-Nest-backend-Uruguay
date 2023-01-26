import { ICRUD } from './base/CRUD.interface';
import { AccountEntity } from '../../entities/account.entity';
export interface AccountRepositoryInterface extends ICRUD<AccountEntity> {}