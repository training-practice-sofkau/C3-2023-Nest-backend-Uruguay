import { IsNotEmpty, IsNumber, IsPositive, IsUUID, IsString, IsDate } from 'class-validator';

export class CreateTrasferDto {

    @IsUUID(4, { message: "This must to be uuid." })
    @IsNotEmpty({ message: "This slot must not be empty."})
    id: string;

    @IsUUID(4, { message: "This must to be uuid." })
    @IsNotEmpty({ message: "This slot must not be empty."})
    outcome: string;

    @IsUUID(4, { message: "This must to be uuid." })
    @IsNotEmpty({ message: "This slot must not be empty."})
    income: string;

    @IsNumber(undefined, { message: "Not a valid format."})
    @IsNotEmpty({ message: "This slot must not be empty."})
    @IsPositive({ message: "Needs a positive value."})
    amount: number;

    @IsString()
    reason: string;

    @IsDate({ message: "Not a valid format."})
    @IsNotEmpty({ message: "This slot must not be empty."})
    dateTime: Date;
}