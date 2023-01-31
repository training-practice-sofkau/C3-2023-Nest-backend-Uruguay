import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class HistoryDto {

    @ApiProperty()
    @IsDate({ message: 'the date init data is not a date.' })
    dateInit: Date;

    @ApiProperty()
    @IsDate({ message: 'the date end data is not a date.' })
    dateEnd: Date;

}