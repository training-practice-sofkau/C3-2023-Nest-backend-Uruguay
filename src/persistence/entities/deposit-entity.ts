import { randomUUID } from "crypto";
import { IAccountModel } from "src/models/i-account-model";
import { IDepositModel } from "src/models/i-deposit-model";
import { v4 as uuid } from 'uuid';

export class DepositEntity implements IDepositModel{
    [x: string]: any;
    
    id = uuid();
    account: IAccountModel;
    amount: number;
    dateTime: number | Date;
    deletedAt?: number | Date | undefined;

    
    
} 