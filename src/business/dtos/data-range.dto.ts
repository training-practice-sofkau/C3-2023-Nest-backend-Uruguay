import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class DataRangeDto {
    @IsNotEmpty()
    @IsDate()
    start: number | Date;

    @IsNotEmpty()
    @IsDate()
    end: number | Date;
}