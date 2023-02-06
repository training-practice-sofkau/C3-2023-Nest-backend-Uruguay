import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class AccountTypeDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;
}