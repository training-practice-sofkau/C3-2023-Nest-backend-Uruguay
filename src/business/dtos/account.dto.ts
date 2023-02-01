import { IsBoolean, IsInt, IsOptional, IsUUID, IsNotEmpty, IsDate } from 'class-validator';

import { CustomerEntity, AccountTypeEntity } from '../../data/persistence';


export class AccountDto {

    @IsNotEmpty()
    customer: CustomerEntity;

    @IsNotEmpty()
    accountType: AccountTypeEntity;

}