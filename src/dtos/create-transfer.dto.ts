import { IsDate, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTransferDto {

    @IsUUID(4, { message: "outcome id must to be uuid" })
    outcomeId: string;

    @IsUUID(4, { message: "income id must to be uuid" })
    incomeId: string;

    @IsNumberString(undefined, { message: 'the balance is not a number.' })
    balance: string;

    @IsString({ message: 'the reason is not a string.' })
    reason: string;
    
    @IsDate()
    @IsOptional()
    dateTime?: Date;

}