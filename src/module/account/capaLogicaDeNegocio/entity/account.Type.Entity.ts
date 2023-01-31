import { v4 as uuid } from "uuid";
import { AccountTypeModel } from "../../capaDeDato/models";


export class AccountTypeEntity implements AccountTypeModel{
    id = uuid();
    name: string;
    state = true;
}