import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class PatchAccountTypeDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    state?: boolean;
}