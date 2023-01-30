import {IsPositive, IsNumber } from 'class-validator';

export class paginationDto{

    @IsNumber()
    @IsPositive()
    offset: number;

    @IsNumber()
    @IsPositive()
    limit?: number;
}