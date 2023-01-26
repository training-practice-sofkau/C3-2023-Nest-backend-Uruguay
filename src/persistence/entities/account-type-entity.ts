import { IAccountTypeModel } from "src/models/i-account-type-model";
import { v4 as uuid } from 'uuid';


export class AccountTypeEntity implements IAccountTypeModel {

     id = uuid();
     name: string;
     state = true;
    
}


