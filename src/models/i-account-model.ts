export interface IAccountModel {
   
    id : string;
    customerId : string;
    accountTypeId : number;
    balance: number;
    state: boolean
    daletedAt?: Date | number ;

}
