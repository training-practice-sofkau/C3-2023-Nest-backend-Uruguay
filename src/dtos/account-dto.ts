import { IsEmail, IsNumberString, IsUUID, IsString } from 'class-validator';

export class AccountDto{

    @IsUUID(4, { message: "this must to be uuid" })
    accountTypeId: string ; 
   
}