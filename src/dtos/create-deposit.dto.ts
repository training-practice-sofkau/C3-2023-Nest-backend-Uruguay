import { IsNumber, IsUUID } from "class-validator";

export class CreateDepositDto {

    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @IsNumber(undefined, { message: 'the amount is not a number.' })
    amount: number;

}