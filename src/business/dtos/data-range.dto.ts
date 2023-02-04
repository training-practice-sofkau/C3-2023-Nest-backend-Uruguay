import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class DataRangeDto {
    @IsNotEmpty()
    start: number | Date;

    @IsNotEmpty()
    end: number | Date;
}