import { AccountTypeEntity } from '../../entities/';
import { ICRUD, TypesMethodsInterface } from './base/';

export interface AccountTypeRepositoryInterface extends ICRUD<AccountTypeEntity>, TypesMethodsInterface<AccountTypeEntity>{

}