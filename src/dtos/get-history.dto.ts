import { IsDate } from "class-validator";

export class HistoryDto {

    @IsDate({ message: 'the date init data is not a date.' })
    dateInit: Date;

    @IsDate({ message: 'the date end data is not a date.' })
    dateEnd: Date;

}