import { AccountModel } from "./account.model";

export interface depositModel {
     dep_id : string,
     account_id: AccountModel,
     dep_amount: number,
     dep_date_time : Date | number,
     daletedAt?: Date | number;
   }

   