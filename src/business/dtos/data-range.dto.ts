import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class DataRangeDto {
    @IsNotEmpty()
    @IsDate()
    offset: Date;

    @IsNotEmpty()
    @IsDate()
    limit: Date;
}