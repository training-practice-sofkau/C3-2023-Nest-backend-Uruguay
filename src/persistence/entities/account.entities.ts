import { v4 as uuid } from 'uuid';
import { IAccountModel } from '../../models/account_type.interface';

export class Account implements IAccountModel {
    acc_id = uuid();
    coustomer_id: string ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    account_type_id: string;
    acc_balance: number;
    acc_state: boolean;
    acc_delete_at: Date;
}