import { ICRUD } from './base/CRUD.interface';
import { AccountEntity } from '../../entities/account.entity';
import { FindStateInterface } from './base/find-state.interface';
export interface AccountRepositoryInterface extends ICRUD<AccountEntity>, FindStateInterface<AccountEntity> {

    findByCustomer(customerId: string): AccountEntity[];

    findByAccountType(accountTypeId: string): AccountEntity[];
}