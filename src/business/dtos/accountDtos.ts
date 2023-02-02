import { IsNotEmpty, IsNumber } from "class-validator";
import { CustomerModel, AccountTypeModel } from "src/Data";



export class AccountDtos {
  @IsNotEmpty({message: 'Please enter a customer model.'})
  customer: CustomerModel;
  @IsNotEmpty({message: 'Please enter a Account Type model.'})
  accountType: AccountTypeModel;
  @IsNotEmpty({message: 'Please enter a balance.'})
  @IsNumber(undefined,{message: 'Enter account balance.'})
  acc_Balance: number;

  id: string
  state: boolean
  name: string 
 

}
