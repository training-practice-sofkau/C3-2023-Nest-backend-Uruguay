import { ICRUD, FindStateInterface } from './base/';
import { AccountEntity } from '../../entities/';

export interface AccountRepositoryInterface extends ICRUD<AccountEntity>, FindStateInterface<AccountEntity> {

    findByCustomer(customerId: string): AccountEntity[];

    findByAccountType(accountTypeId: string): AccountEntity[];
}