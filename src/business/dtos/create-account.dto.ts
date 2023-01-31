import { IsNumberString, IsString, IsUUID} from 'class-validator';

export class CreateAccountDto {

    @IsUUID(4, { message: "customer id must to be uuid." })
    customerId: string;

    @IsString({ message: "account type name must to be string." })
    accountTypeName: string;

    @IsNumberString({ message: "balance is not a number." })
    balance: number;
    
}