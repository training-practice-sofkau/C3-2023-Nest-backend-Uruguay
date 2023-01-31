import { IsNotEmpty, IsNumber, IsPositive, IsUUID, IsString, IsDate, Min, Max } from 'class-validator';

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
    @Min(1, { message: "The minimun value is 1."})
    amount: number;

    @IsString({ message: "Not a valid format."})
    @Max(300)
    reason: string;

    @IsDate({ message: "Not a valid format."})
    @IsNotEmpty({ message: "This slot must not be empty."})
    dateTime: Date;
}