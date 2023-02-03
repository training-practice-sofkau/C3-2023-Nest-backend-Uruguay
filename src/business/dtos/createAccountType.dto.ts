import { IsUUID, IsNumber, IsBoolean, IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountTypeDto {


    @IsUUID(4, { message: "this must to be uuid" })
    id:string;

    @IsString({ message: "Invalid value name" })
    @IsNotEmpty()
    name: string;
}