import { CustomerEntity } from '../../../customer/capaDeDato/entity/customer.entity';
import { AccountTypeEntity } from '../entity';





export interface AccountModel {
  
        id: string;
        coustomer_id: CustomerEntity ;
        account_type_id: AccountTypeEntity;
        balance: number;
        state: boolean;
        delete_at: Date;
}
