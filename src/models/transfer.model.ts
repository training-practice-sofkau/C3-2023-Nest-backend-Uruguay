
export interface transferModel {
  
    trf_id: string;
    trf_outcome: string ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    trf_income: string;
    trf_amount: number;
    trf_reason: string;
    trf_date_time: Date;
    trf_delete_at: Date;
}
