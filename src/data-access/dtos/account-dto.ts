import { IsEmail, IsNumberString, IsUUID, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class AccountDTO {

    @IsUUID(4, { message: "The value is not a UUID valid!" })
    id: string;


    customer: string;


    accountType: string;


    balance: number;

    @IsBoolean()
    state: boolean;

}