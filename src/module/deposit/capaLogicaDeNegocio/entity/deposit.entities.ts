import { v4 as uuid } from 'uuid';
import { DepositModel } from '../../capaDeDato/models';
import { AccountEntity } from 'src/module/account/capaLogicaDeNegocio/entity';


export class DepositEntity implements DepositModel  {
    
    id = uuid();
    account: AccountEntity;
    amount: number;
    date_time: Date | number;
    delete_at: Date | number;
}