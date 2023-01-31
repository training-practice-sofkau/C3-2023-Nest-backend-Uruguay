import { AccountModel } from "src/module/account/capaDeDato/models";


export interface DepositModel  {
    id : string;
    account: AccountModel ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    amount: number;
    date_time: Date | number;
    delete_at: Date | number;
}