import { IsUUID, IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsAlphanumeric, IsUrl, IsOptional } from "class-validator";

export class CustomerDto {

    @IsUUID(4, { message: "this must to be uuid" })
    id: string;

    @IsNotEmpty({ message: ' This field should not be empty' })
    documentType: string;

    @IsNotEmpty({ message: ' This field should not be empty' })
    @IsString({ message: ' This field should be a string' })
    document: string;

    @IsNotEmpty({ message: ' This field should not be empty' })
    @IsString({ message: ' This field should be a string' })
    fullName: string;

    @IsNotEmpty({ message: ' This field should not be empty' })
    @IsEmail()
    email: string;

    @IsString({ message: ' This field should be a string' })
    @IsNotEmpty({ message: ' This field should not be empty' })
    phone: string;

    @IsString({ message: ' This field should be a string' })
    @MinLength(8)
    @MaxLength(100)
    @IsAlphanumeric() 
    password: string;

    @IsString({ message: ' This field should be a string' })
    @IsUrl()
    @IsOptional()
    avatarUrl?: string;

    state = true;

}
/*
import { IsEmail } from "class-validator";
import { IsAlphanumeric, IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsString, IsUUID, Min } from "class-validator/types/decorator/decorators";

export class customerDto {

    @IsUUID(4, { message: "this must to be uuid" })
    documentType: string;

    @IsString({ message: 'the value is not a valid document.' })
    document: string;

    @IsString({ message: "this must to be fullName" })
    fullName: string;

    @IsString({ message: 'the value is not a valid email.' })
    email: string;

    @IsString({ message: "this must to be phone"})
    phone: string;

    @IsString({ message: "this must to be password"})
    @IsAlphanumeric(undefined,{ message: "this must to be password"})
    password: string;

    @IsString({ message: 'the value is not a valid avatarUrl.'})
    avatarUrl: string;

    @IsBoolean({ message: "this must to be state"})
    state: boolean;
    
}*/