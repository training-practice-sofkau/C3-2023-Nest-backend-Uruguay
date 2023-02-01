import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DocumentTypeDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;

}