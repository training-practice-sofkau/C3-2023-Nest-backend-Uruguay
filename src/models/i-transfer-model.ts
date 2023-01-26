import { IAccountModel } from "./i-account-model";

export interface ITransferModel {

    id: string;
    outcome:IAccountModel;
    income: IAccountModel;
    amount: number;
    reason: string;
    dateTime: Date | number;
    deletedAt?: Date | number;

}
