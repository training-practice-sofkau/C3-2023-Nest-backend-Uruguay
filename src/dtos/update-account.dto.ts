import { IsNumberString, IsUUID} from 'class-validator';

export class UpdateAccountDto {

    @IsUUID(4, { message: "account id must to be uuid." })
    AccountId: string;

    @IsUUID(4, { message: "customer id must to be uuid." })
    customerId: string;

    @IsUUID(4, { message: "account type id must to be uuid." })
    accountTypeId: string;

    @IsNumberString({ message: "balance is not a number." })
    balance: number;
    
}