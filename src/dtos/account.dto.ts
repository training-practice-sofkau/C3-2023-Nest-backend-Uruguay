import { IsNotEmpty, IsNumber } from "class-validator";
import { AccountTypeModel, CustomerModel } from "src/models";

export class CreateAccountDto {
    
    @IsNotEmpty({ message: ' is required.' })
    customer: CustomerModel;
   
    @IsNotEmpty({ message: ' is required.' })
    accountType: AccountTypeModel;
    
    balance: number;

}