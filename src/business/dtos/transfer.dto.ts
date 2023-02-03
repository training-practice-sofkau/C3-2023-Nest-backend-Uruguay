import { IsDate, IsNumber, IsString, IsUUID} from "class-validator";

export class transferDto {

    @IsUUID(4, { message: "this must to be uuid" })
    outcome_id: string;

    @IsUUID(4, { message: "this must to be uuid" })
    income_id: string;

    @IsNumber({ })
    amount: number;

    @IsString({ message: "this must to be reason" })
    reason: string;

    @IsDate({ message: "this must to be date_time" })
    @IsNumber({})
    date_time: Date|number;

    @IsDate({ message: "this must to be deleted_at" })
    @IsNumber({})
    deleted_at: Date|number;

}