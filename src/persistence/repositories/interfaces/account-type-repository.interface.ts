import { AccountTypeEntity } from '../../entities/account-type.entity';
import { ICRUD, TypesMethodsInterface } from './base/';

export interface AccountTypeRepositoryInterface extends ICRUD<AccountTypeEntity>, TypesMethodsInterface<AccountTypeEntity>{

}