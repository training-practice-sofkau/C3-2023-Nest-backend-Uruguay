import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { PaginationDto, DateRangeDto } from '.';

export class HistoryDto {

    @ApiProperty()
    @IsUUID(4, { message: 'id is not a UUID.' })
    id: string;

    @ApiPropertyOptional()
    pagination?: PaginationDto;

    @ApiPropertyOptional()
    datarange?: DateRangeDto;

}