import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString, IsUUID} from 'class-validator';

export class CreateAccountDto {

    @ApiProperty()
    @IsUUID(4, { message: "customer id must to be uuid." })
    customerId: string;

    @ApiProperty()
    @IsString({ message: "account type name must to be string." })
    accountTypeName: string;

    @ApiProperty()
    @IsNumberString({ message: "balance is not a number." })
    balance: number;
    
}