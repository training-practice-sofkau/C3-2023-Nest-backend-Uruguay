import { IsEmail } from "class-validator";
import { IsNotEmpty, IsString, Min } from "class-validator/types/decorator/decorators";

export class AccountTypeDto {

    @IsNotEmpty({ message: 'the value is required.' })
    @IsString({ message: 'invalid value.' })
    accountId: string;

    @IsNotEmpty({ message: 'the value is required.' })
    @IsString({ message: 'the value is required.' })
    accountTypeId: string;
}