
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { CustomerModel, AccountTypeModel } from "src/Capa-Data/models";


export class CreateAccountDto {
    
    @IsUUID(4,{message: "Debe tener algo we"})
    accountType: string

    @IsUUID(4, {message: "hola"})
    customer: string
}