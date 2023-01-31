import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTransferDto {

    @ApiProperty()
    @IsUUID(4, { message: "outcome id must to be uuid" })
    outcomeId: string;

    @ApiProperty()
    @IsUUID(4, { message: "income id must to be uuid" })
    incomeId: string;

    @ApiProperty()
    @IsNumber(undefined, { message: 'the balance is not a number.' })
    balance: number;

    @ApiProperty()
    @IsString({ message: 'the reason is not a string.' })
    reason: string;
    
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    dateTime?: Date;

}