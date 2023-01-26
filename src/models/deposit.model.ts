
export interface DepositModel  {
    dep_id : string;
    account_id: string ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    dep_amount: number;
    dep_date_time: boolean;
    dep_delete_at: Date;
}