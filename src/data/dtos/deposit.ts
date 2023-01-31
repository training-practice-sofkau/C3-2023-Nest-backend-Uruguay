import { IsEmail } from "class-validator";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsNumberString, IsString, IsUUID, Min } from "class-validator/types/decorator/decorators";

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