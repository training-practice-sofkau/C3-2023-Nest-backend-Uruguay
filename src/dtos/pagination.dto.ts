import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {

    @IsNumber(undefined, { message: 'the pagination offset is not a number.' })
    @IsOptional()
    offset?: number;

    @IsNumber(undefined, { message: 'the pagination limit is not a number.' })
    @IsOptional()
    limit?: number;

}