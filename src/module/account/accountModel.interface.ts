import { CustomerEntity } from '../cusotmer/customer.entity';



export interface AccountModel {
  
        id: string;
        coustomer_id: CustomerEntity ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
        account_type_id: ;
        balance: number;
        state: boolean;
        delete_at: Date;
}
