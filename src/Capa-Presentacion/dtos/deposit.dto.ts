
import { IsUUID, IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator";
import { AccountEntity } from "src/Capa-Data/persistence";

import { v4 as uuid } from 'uuid';

export class DepositDto { 
    
     @IsUUID(4, { message: "this must to be uuid" })
    id = uuid();
    

     @IsNotEmpty({ message: ' is required.' })
    account: AccountEntity;
   
    @IsNumber()
    @IsPositive()
    @Min(0)
    amount: number;
   
}