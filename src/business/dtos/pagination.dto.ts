import { IsNumberString, IsOptional } from "class-validator";

export class PaginationDto {

    @IsNumberString(undefined, { message: 'the pagination offset is not a number.' })
    @IsOptional()
    offset?: number;

    @IsNumberString(undefined, { message: 'the pagination limit is not a number.' })
    @IsOptional()
    limit?: number;

}