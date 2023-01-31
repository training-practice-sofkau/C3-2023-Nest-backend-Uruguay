import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsUUID} from 'class-validator';

export class UpdateAccountDto {

    @ApiProperty()
    @IsUUID(4, { message: "account id must to be uuid." })
    AccountId: string;

    @ApiProperty()
    @IsUUID(4, { message: "customer id must to be uuid." })
    customerId: string;

    @ApiProperty()
    @IsUUID(4, { message: "account type id must to be uuid." })
    accountTypeId: string;

    @ApiProperty()
    @IsNumberString({ message: "balance is not a number." })
    balance: string;
    
}