import { IsNumber, IsOptional } from "class-validator"

export class PaginationDto {

    @IsNumber()
    @IsOptional()
    offset?: number
    
    @IsNumber()
    @IsOptional()
    limit?: number
}