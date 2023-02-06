import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PAtchDocumentTypeDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    state?: boolean;

}