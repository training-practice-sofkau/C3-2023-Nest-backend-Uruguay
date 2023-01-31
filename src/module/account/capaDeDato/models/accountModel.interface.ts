import { CustomerEntity } from '../../../customer/capaLogicaDeNegocio/entity/customer.entity';
import { AccountTypeEntity } from '../../capaLogicaDeNegocio/entity';





export interface AccountModel {
  
        id: string;
        coustomer_id: CustomerEntity ;
        account_type_id: AccountTypeEntity;
        balance: number;
        state: boolean;
        delete_at: Date;
}
