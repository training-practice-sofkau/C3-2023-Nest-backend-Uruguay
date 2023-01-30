import { IsEmail } from "class-validator";
import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsString, IsUUID, Min } from "class-validator/types/decorator/decorators";

export class customerDto {

    @IsUUID(4, { message: "this must to be uuid" })
    documentType: string;

    @IsUUID(4, { message: "this must to be uuid" })
    account_type_id: string;

    @IsString({ message: 'the value is not a valid document.' })
    document: string;

    @IsString({ message: "this must to be fullName" })
    fullName: string;

    @IsString({ message: 'the value is not a valid email.' })
    email: string;

    @IsString({ message: "this must to be phone"})
    phone: string;

    @IsString({ message: "this must to be password"})
    password: string;

    @IsString({ message: 'the value is not a valid avatarUrl.'})
    avatarUrl: string;

    @IsString({ message: "this must to be state"})
    state: boolean;
    
}