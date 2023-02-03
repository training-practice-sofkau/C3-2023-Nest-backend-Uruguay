import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class DataRangeDto {
    @IsNotEmpty()
    @IsDate()
    start: Date;

    @IsNotEmpty()
    @IsDate()
    end: Date;
}