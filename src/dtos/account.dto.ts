import { IsNotEmpty, IsNumber } from "class-validator";
import { AccountTypeModel, CustomerModel } from "src/models";

export class CreateAccountDto {
    
    @IsNotEmpty({ message: 'This field should not be empty' })
    customer: CustomerModel;
   
    @IsNotEmpty({ message: ' This field should not be empty' })
    accountType: AccountTypeModel;
    
    @IsNumber(undefined, { message: ' The field must be a valid number.' })
    balance: number;

}