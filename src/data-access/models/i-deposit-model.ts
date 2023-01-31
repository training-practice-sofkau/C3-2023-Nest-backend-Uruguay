import { IAccountModel } from "./i-account-model";

export interface IDepositModel {

    id: string;
    account: IAccountModel;
    amount: number;
    dateTime: Date | number;
    deletedAt?: Date | number;

}
