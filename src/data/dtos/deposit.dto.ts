import { IsUUID, IsNumber, IsDate } from "class-validator";

export class depositDto {

    @IsUUID(4, { message: "this must to be uuid" })
    account_id: string;

    @IsNumber({ })
    amount: number;

    @IsDate({message: "this must to be date_time"})
    @IsNumber({})
    date_time: Date|number;

    @IsDate({ message: "this must to be deleted_at" })
    @IsNumber({})
    deleted_at: Date|number;

}