import { IsDateString } from 'class-validator';
export class DataRangeDto {

    @IsDateString()
    min: number | Date
    @IsDateString()
    max: number | Date
}