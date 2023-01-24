import { AccountTypeModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountTypeModel{
    id= uuid();
    name: string;
    state: boolean;
}