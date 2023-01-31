import { IAccountModel } from "./i-account-model";

export interface ITransferModel {

    id: string;
    outcome:IAccountModel; //Cuenta destino
    income: IAccountModel;  //Cuenta entrante
    amount: number;
    reason: string;
    dateTime: Date | number;
    deletedAt?: Date | number;

}
