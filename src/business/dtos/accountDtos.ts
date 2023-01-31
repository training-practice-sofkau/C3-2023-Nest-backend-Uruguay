import { IsNotEmpty, IsNumber } from "class-validator";
import { AccountTypeModel, CustomerModel } from "src/models";


export class AccountDtos {
  @IsNotEmpty({message: 'Please enter a customer model.'})
  customer: CustomerModel;
  @IsNotEmpty({message: 'Please enter a Account Type model.'})
  accountType: AccountTypeModel;
  @IsNotEmpty({message: 'Please enter a balance.'})
  @IsNumber(undefined,{message: 'Enter account balance.'})
  acc_Balance: number;
 

}
