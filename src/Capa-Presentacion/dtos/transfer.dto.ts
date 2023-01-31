import { IsAlphanumeric, IsDate, IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator";
import { AccountModel } from "src/Capa-Data/models";


export class TransferDto {

    @IsNumber()
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    outCome: AccountModel;

    @IsNotEmpty()
    inCome: AccountModel;

    @IsNumber()
    @IsPositive()
    @Min(0)
    amount: number;

    @IsAlphanumeric()
    reason: string;

    @IsDate()
    dateTime: Date | number;

}