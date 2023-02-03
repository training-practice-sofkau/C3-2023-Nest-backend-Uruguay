import { IsNotEmpty, IsString } from "class-validator";

export class ChangeAccountTypeDto {

    
    
    @IsNotEmpty({ message: 'the value is required.' })
    @IsString({ message: 'invalid value.' })
    accountId: string;

    @IsNotEmpty({ message: 'the value is required.' })
    @IsString({ message: 'the value is required.' })
    accountTypeId: string;

    
}