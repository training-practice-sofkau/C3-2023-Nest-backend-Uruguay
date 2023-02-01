import { IsEmail, IsNumberString, IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountDto{

    @IsUUID(4, { message: "The value is not a UUID valid!" })
    @IsNotEmpty({message:'This value cannot be empty!'})
    customerId: string;
   
    @IsUUID(4, { message: "The value is not a UUID valid!" })
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountTypeId: string ;


    
}