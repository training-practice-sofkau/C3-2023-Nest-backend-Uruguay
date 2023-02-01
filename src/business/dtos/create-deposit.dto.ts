import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateDepositDto {

    @ApiProperty()
    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @ApiProperty()
    @IsNumber(undefined ,{ message: 'the balance is not a number.' })
    balance: number;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    dateTime?: Date;

}