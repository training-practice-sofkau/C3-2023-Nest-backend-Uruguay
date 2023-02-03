import { IsNumber } from "class-validator";

export class PaginationDto {

    @IsNumber(undefined, { message: "invalid value" })
    offset?: number;

    @IsNumber(undefined, { message: "invalid value" })
    limit?: number;

}