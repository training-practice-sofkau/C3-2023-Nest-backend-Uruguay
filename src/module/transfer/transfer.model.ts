import { AccountEntity } from "../account/account.entities";


export interface transferModel {
  
    id: string;
    outcome: AccountEntity ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    income: AccountEntity;
    amount: number;
    reason: string;
    date_time: Date | number;
    delete_at: Date | number;
}
