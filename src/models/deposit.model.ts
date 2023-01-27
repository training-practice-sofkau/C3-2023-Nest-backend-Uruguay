export interface DepositModel{
    id: string;
    accountId: string;
    amount: number;
    dateTime: Date;
    deletedAt?: Date | number;
}