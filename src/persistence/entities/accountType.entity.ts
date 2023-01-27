import { v4 as uuid } from 'uuid';

import { AccountTypeModel } from '../../models';

export class AccountTypeEntity implements AccountTypeModel{
    id = uuid();
    state: true  | false;;
    name: string;   

}