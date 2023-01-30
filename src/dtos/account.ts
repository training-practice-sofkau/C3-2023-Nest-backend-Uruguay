import { IsEmail } from "class-validator";
import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, IsUUID, Min } from "class-validator/types/decorator/decorators";

export class accountDto {

    @IsUUID(4, { message: "this must to be uuid" })
    Customerid: string;

    @IsUUID(4, { message: "this must to be uuid" })
    account_type_id: string;

    @IsNumber(undefined, { message: 'the value is not a valid balance.' })
    balance: string;

    @IsBoolean({ message: "this must to be state" })
    state: boolean;

}