import { IsBoolean, IsInt, IsOptional, IsUUID, IsNotEmpty, IsDate } from 'class-validator';


export class AccountDto {

    @IsOptional()
    @IsUUID(4,{message: 'uuid must to be a valid v4 UUID'})
    customer: string;

    @IsOptional()
    @IsUUID(4,{message: 'uuid must to be a valid v4 UUID'})
    accountType: string

}