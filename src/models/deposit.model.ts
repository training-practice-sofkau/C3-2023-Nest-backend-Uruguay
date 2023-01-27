import { AccountModel } from '../models';

export interface depositModel {
     id : string,
     account: AccountModel,
     amount: number,
     dateTime : Date | number,
     deletedAt?: Date | number;
   }

   