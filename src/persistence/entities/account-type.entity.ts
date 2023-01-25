import { AccountTypeModel } from '../../models';
import { GeneralCRUD } from '../repositories';
import { v4 as uuid } from 'uuid';

export class AccountTypeEntity extends GeneralCRUD<AccountTypeModel> implements AccountTypeModel{
    id = uuid();
    name: string;
    state = true;
}