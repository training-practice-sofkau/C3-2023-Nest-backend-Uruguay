import { AccountModel } from "./account.models";

export interface TransferModel {
    trf_id: string,
    trf_outcome: AccountModel,
    trf_income: AccountModel,
    trf_reason: string,
    trf_date_time: Date | number,
    trf_deleted_at?: Date | number
   
   }