import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { AccountTypeEntity, CustomerEntity } from "../../data/persistence/entities";

export class UpdateAccountDto {

    @IsOptional()
    @IsNotEmpty()
    customer: CustomerEntity;

    @IsOptional()
    @IsNotEmpty()
    accountType: AccountTypeEntity;

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