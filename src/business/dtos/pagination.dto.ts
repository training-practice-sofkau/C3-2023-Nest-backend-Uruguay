import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    offset: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    limit?: number;
}