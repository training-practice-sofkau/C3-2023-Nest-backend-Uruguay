import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateTransferDto {

    @IsUUID(4, { message: "outcome id must to be uuid" })
    outcomeId: string;

    @IsUUID(4, { message: "income id must to be uuid" })
    incomeId: string;

    @IsNumber(undefined, { message: 'the balance is not a number.' })
    balance: number;

    @IsString({ message: 'the reason is not a string.' })
    reason: string;

}