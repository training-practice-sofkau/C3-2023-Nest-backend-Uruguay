import { IsNotEmpty, IsNumber, IsPositive, IsUUID, Min } from "class-validator";

export class CreateDepositDto{
    
    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountId: string;

    @IsNumber()
    @IsPositive({message:'This value must be bigger than 0!'})
    @IsNotEmpty({message:'This value cannot be empty!'})
    @Min(1,{message:'The minimun value is 1!'})
    amount: number;   
    
}