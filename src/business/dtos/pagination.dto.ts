import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional } from "class-validator";

export class PaginationDto {

    @ApiProperty()
    @IsNumberString(undefined, { message: 'the pagination offset is not a number.' })
    @IsOptional()
    offset?: number;

    @ApiProperty()
    @IsNumberString(undefined, { message: 'the pagination limit is not a number.' })
    @IsOptional()
    limit?: number;

}