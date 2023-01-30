import { IsNumberString, IsUUID } from "class-validator";

export class CreateDepositDto {

    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @IsNumberString(undefined, { message: 'the amount is not a number.' })
    amount: string;

}