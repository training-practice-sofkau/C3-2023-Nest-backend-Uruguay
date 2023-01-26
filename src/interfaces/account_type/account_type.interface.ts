

export interface IAccountModel {
  
        acc_id: string;
        coustomer_id: string ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
        account_type_id: string;
        acc_balance: number;
        acc_state: boolean;
        acc_delete_at: Date;
}
