import { AccountModel } from 'src/module/account/models/accountModel.interface';



export interface TransferModel {
  
    id: string;
    outcome: AccountModel ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    income: AccountModel;
    amount: number;
    reason: string;
    date_time: Date | number;
    delete_at: Date | number;
}
