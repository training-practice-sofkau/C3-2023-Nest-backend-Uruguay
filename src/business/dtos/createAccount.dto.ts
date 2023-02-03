import { IsUUID, IsNumber, IsBoolean } from "class-validator";

export class CreateAccountDto {


    @IsUUID(4, { message: "this must to be uuid" })
    id:string;

    @IsUUID(4, { message: "this must to be uuid" })
    CustomerId: string;

    @IsUUID(4, { message: "this must to be uuid" })
    account_type_id: string;

    @IsNumber(undefined, { message: 'the value is not a valid balance.' })
    balance: number;

    @IsBoolean({ message: "this must to be state" })
    state: boolean;

}