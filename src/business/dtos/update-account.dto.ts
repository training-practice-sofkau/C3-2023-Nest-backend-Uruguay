import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsPositive, IsUUID } from "class-validator";
import { AccountTypeEntity, CustomerEntity } from "../../data/persistence/entities";

export class UpdateAccountDto {

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    customer: string;

    @IsOptional()
    @IsNotEmpty()
    accountType: string;

    @IsOptional()
    @IsNotEmpty()
    @IsPositive()
    balance: number;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    state: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    deletedAt: number | Date;

}