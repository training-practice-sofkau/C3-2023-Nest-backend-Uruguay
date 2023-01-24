export interface DepositModel{
    id: string;
    accountId: string;
    amount: number;
    dateTime: Date;
    deleteAt: Date | number;
}