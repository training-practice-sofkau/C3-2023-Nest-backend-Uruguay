import { IsUUID, IsNotEmpty } from 'class-validator';

export class AccountDto {

    @IsNotEmpty()
    @IsUUID()
    customer: string;

    @IsNotEmpty()
    @IsUUID()
    accountType: string;

}