import { AccountTypeModel } from 'src/persistence/entities/account.type.entities';
import { accountType } from './account_type';

export interface transferModel {
  
    trf_id: string;
    trf_outcome: AccountTypeModel ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    trf_income: AccountTypeModel;
    trf_amount: number;
    trf_reason: string;
    trf_date_time: Date;
    trf_delete_at: Date;
}
