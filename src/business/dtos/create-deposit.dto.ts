import { IsDateString, IsNumberString, IsOptional, IsUUID } from "class-validator";

export class CreateDepositDto {

    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @IsNumberString(undefined, { message: 'the balance is not a number.' })
    balance: string;

    @IsDateString()
    @IsOptional()
    dateTime?: Date;

}