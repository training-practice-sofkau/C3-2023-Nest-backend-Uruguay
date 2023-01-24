import { v4 as uuid } from 'uuid';

import { AccountModel } from '../../models';

export class AccountTypeEntity implements AccountModel{
    id = uuid();
    name: string;
    state = true;
}