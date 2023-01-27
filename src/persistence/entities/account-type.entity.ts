import { AccountTypeModel } from 'src/models';
import { v4 as uuid } from 'uuid';

export class AccountTypeEntity implements AccountTypeModel{
  id = uuid();
  name: string;
  state: true;
    
    
}
