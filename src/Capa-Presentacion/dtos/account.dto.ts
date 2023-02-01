
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { CustomerModel, AccountTypeModel } from "src/Capa-Data/models";


export class CreateAccountDto {
    
   @IsNotEmpty()
    accountType: AccountTypeModel
    
    customer: CustomerModel

    @IsNumber()
    balance: number;
}