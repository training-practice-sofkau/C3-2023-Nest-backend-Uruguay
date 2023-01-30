import { CustomerEntity } from '../customer/customer.entity';
import { AccountTypeEntity } from './account.Type.Entity';




export interface AccountModel {
  
        id: string;
        coustomer_id: CustomerEntity ;
        account_type_id: AccountTypeEntity;
        balance: number;
        state: boolean;
        delete_at: Date;
}
