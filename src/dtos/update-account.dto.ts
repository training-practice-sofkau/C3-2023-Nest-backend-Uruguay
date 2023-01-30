import { IsNumberString, IsUUID, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class UpdateAccountDto {

    @IsUUID(4, { message: "account id must to be uuid." })
    AccountId: string;

    @IsUUID(4, { message: "customer id must to be uuid." })
    customerId: string;

    @IsUUID(4, { message: "account type id must to be uuid." })
    accountTypeId: string;

    @IsNumberString({ message: "balance is not a number." })
    balance: number;

    @IsBoolean({ message: "state is not state." })
    state: boolean;

    @IsDate({ message: "deletedat must to be a date." })
    @IsOptional()
    deletedAt?: Date;
    
}