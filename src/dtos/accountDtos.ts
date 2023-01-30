import { IsString } from "class-validator";
import { AccountTypeModel, CustomerModel } from "src/models";


export class AccountDtos {

  customer: CustomerModel;
  
  accountType: AccountTypeModel;
  @IsString({message: "Enter a name for your account"})
  name: string;

}
