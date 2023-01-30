import { IsNumber, IsUUID } from "class-validator";

export class CreateAccountDto {

    @IsUUID(4, { message: "customer id must to be uuid" })
    customerId: string;

    @IsUUID(4, { message: "account type id must to be uuid" })
    accountTypeId: string;

    @IsNumber(undefined, { message: 'balance is not a number.' })
    balance: number;

}