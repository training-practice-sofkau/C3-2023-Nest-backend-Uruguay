import { AccountModel } from "./account.model";

export interface depositModel {
     id : string,
     account: AccountModel,
     amount: number,
     dateTime : Date | number,
     daletedAt?: Date | number;
   }

   