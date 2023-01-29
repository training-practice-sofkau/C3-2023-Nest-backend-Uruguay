import { AccountEntity } from "../account/account.entities";

export interface DepositModel  {
    id : string;
    account: AccountEntity ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    amount: number;
    date_time: Date;
    delete_at: Date | number;
}