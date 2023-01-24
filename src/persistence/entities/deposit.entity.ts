import {  DepositModel } from "../../models";
import { AccountEntity } from '.';
import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel{
    state: boolean;
    id = uuid();
    accountid: AccountEntity;
    amount: number;
    date_time: Date;
    daletedAt?: number | Date ; 
    
}
