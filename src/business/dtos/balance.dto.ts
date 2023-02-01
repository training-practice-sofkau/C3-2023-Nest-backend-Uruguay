import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export class BalanceDto {

    @ApiProperty()
    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @ApiProperty()
    @IsNumber(undefined, { message: 'the amount is not a number.' })
    amount: number;

}