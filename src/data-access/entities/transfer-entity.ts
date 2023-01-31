import { ITransferModel } from "src/data-access/models/i-transfer-model";
import { AccountEntity } from "./account-entity";
import { v4 as uuid } from 'uuid';

export class TransferEntity implements ITransferModel {

     id = uuid();
     outcome: AccountEntity; //Cuenta destino
     income: AccountEntity; //Cuenta entrante
     amount: number;
     reason: string;
     dateTime: number | Date;
     deletedAt?: number | Date | undefined;
    
    
}