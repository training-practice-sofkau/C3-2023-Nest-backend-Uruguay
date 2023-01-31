import { IsDate, IsNumber, IsPositive } from "class-validator";

export class dataRangeDto {

    @IsPositive()
    @IsNumber()
    @IsDate()
    min : number | Date;
    
    @IsPositive()
    @IsNumber()
    @IsDate()
    max : number | Date ;
}