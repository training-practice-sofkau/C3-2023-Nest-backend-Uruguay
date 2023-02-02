import { IsString, IsNumber, IsPositive, IsBoolean } from 'class-validator';


export class AccountDto {

    @IsString()
    id: string;
    @IsString()
    customer: string;
    @IsString()
    accountType: string;
    @IsNumber()
    @IsPositive()
    balance: number;
    @IsBoolean()
    state: boolean;
}