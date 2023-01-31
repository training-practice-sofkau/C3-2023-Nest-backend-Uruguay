import { IsDate, IsNumber, IsPositive } from "class-validator";

export class DataRangeDto {

    @IsPositive()
    @IsNumber()
    @IsDate()
    min : number | Date;  //dateStart
    
    @IsPositive()
    @IsNumber()
    @IsDate()
    max : number | Date ;  //dateEnd
}