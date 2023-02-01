import { IsNumber, IsDate } from "class-validator";

export class DataRangeDto {

    @IsNumber(undefined, { message: "invalid value" })
    @IsDate()
    Min: number | Date;

    @IsNumber(undefined, { message: "invalid value" })
    @IsDate()
    Max: number | Date;

}