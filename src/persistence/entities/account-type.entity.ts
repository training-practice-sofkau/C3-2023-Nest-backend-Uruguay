import { AccountTypeModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class AccountTypeEntity implements AccountTypeModel{
    id: string;
    name: string;
    state: boolean;

}