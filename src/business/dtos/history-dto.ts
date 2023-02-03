import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto, DateRangeDto } from '.';

export class HistoryDto {

    @ApiProperty()
    @IsUUID(4, { message: 'id is not a UUID.' })
    id: string;

    @ApiPropertyOptional()
    @IsOptional()
    pagination?: PaginationDto;

    @ApiPropertyOptional()
    @IsOptional()
    datarange?: DateRangeDto;

}