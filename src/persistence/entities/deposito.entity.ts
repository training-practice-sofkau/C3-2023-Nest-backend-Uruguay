import {  DepositModel } from "src/models";
import { AccountEntity } from './account.entity';
import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel{
    id = uuid();
    accountid: AccountEntity;
    amount: number;
    date_time: Date;
    daletedAt?: number | Date ; 
    
}
