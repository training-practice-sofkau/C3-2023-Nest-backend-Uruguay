export interface DepositoModel{
    id: string;
    accountId: string;
    amount: number;
    dateTime: Date;
    deleteAt: Date | number;
}