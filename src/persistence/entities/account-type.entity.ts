import { AccountTypeModel } from '../../models';
import { v4 as uuid } from 'uuid';
import { GeneralCRUD } from '../repositories/base/GeneralCRUD.base';

export class AccountTypeEntity extends GeneralCRUD<AccountTypeModel> implements AccountTypeModel{
    id = uuid();
    name: string;
    state = true;
}