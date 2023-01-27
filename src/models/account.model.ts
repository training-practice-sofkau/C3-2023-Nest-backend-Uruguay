import { AccountTypeEntity } from '../persistence/entities/account-type.entity';
export interface AccountModel{
    id: string;
    customerId: string;
    accountTypeId: AccountTypeEntity;
    balance: number;
    state: boolean;
    deletedAt?: Date | number; 
}