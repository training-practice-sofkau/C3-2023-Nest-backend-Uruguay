import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsUUID} from 'class-validator';

export class UpdateAccountDto {

    @ApiProperty()
    @IsUUID(4, { message: "account id must to be uuid." })
    AccountId: string;

    @ApiProperty()
    @IsUUID(4, { message: "customer id must to be uuid." })
    customerId: string;

    @ApiProperty()
    accountTypeName: string;

    @ApiProperty()
    @IsNumber(undefined, { message: "balance is not a number." })
    @IsPositive()
    balance: number;
    
}