import { AccountModel } from "../account/accountModel.interface";

export interface DepositModel  {
    id : string;
    account: AccountModel ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    amount: number;
    date_time: Date;
    delete_at: Date | number;
}