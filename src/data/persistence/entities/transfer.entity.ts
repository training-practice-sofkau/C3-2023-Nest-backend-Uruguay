import { TransferModel } from "src/data/models";
import { v4 as uuid } from "uuid";
import { AccountEntity } from './';

 export class TransferEntity implements TransferModel{
     id =  uuid();
     outcome: AccountEntity;
     income: AccountEntity;
     amount: number;
     reason: string;
     dateTime: Date | number;
     deletedAt?: Date | number;
 }