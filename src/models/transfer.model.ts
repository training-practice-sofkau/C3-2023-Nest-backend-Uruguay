export interface TransferModel {
    id: string;
    outcome:string;
    income: string;
    amount: number;
    reason: string;
    dateTime: Date | number;
    deletedAt?: Date | number;
}