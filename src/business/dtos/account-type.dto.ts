import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class AccountTypeDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;
}