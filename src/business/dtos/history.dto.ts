import { PaginationDto } from './pagination.dto';
import { DataRangeDto } from 'src/business/dtos/datarange.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class HistoryDto {
@IsUUID()
id:string;

@IsOptional()
pagination?:PaginationDto

@IsOptional()
dataRange?:DataRangeDto

}