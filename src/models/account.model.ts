export interface AccountModel{
    id: string;
    customerId: string;
    accountTypeId: string;
    balance: number;
    state: boolean;
    deletedAt?: Date | number; 
}