import { TransferModel } from '../../models';
import { v4 as uuid } from 'uuid';
import { AccountTypeEntity } from './accountType.entity';

export class TransferEntity implements TransferModel  {   
    id = uuid();
    outcome: AccountTypeEntity;
    accountTypeId: AccountTypeEntity;
    transferAmount: number;
    transferReason: string;
    dateTime: Date;
    state: boolean ;
    daletedAt?: Date | number;
    
}