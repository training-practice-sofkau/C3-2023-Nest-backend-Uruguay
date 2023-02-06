import { IsNotEmpty, IsUUID } from "class-validator";

export class NewaccountDto{
    
    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountID: string;

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountTypeId: string;

    @IsNotEmpty({message:'This value cannot be empty!'})
    name: string
    
    
}