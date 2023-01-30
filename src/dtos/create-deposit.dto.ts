import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";

export class CreateDepositDto {

    @IsUUID(4, { message: "This must to be uuid." })
    @IsNotEmpty({ message: "This slot must not be empty."})
    id: string;

    @IsUUID(4, { message: "This must to be uuid." })
    @IsNotEmpty({ message: "This slot must not be empty."})
    accountId: string;

    @IsNumber(undefined, { message: "Not a valid format."})
    @IsNotEmpty({ message: "This slot must not be empty."})
    @IsPositive({ message: "Needs a positive value."})
    amount: number;

    @IsDate({ message: "Not a valid format."})
    @IsNotEmpty({ message: "This slot must not be empty."})
    dateTime: Date;
}