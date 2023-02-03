import { IsNotEmpty, IsString } from "class-validator";
export class AccountTypeDto{

    @IsNotEmpty({message:'This value cannot be empty!'})
    @IsString()
    name: string;
}