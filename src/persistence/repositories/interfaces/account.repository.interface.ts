import { ICRUD, FindStateInterface } from './base/';
import { AccountEntity } from '../../entities/';
import { PaginationModel } from '../../../models/pagination-model.model';

export interface AccountRepositoryInterface extends ICRUD<AccountEntity>, FindStateInterface<AccountEntity> {

    findByCustomer(pagination: PaginationModel, customerId: string): AccountEntity[];

    findByAccountType(pagination: PaginationModel ,accountTypeId: string): AccountEntity[];
}