import { IsEmail,IsNumberString, IsUUID, IsString, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {

    @IsUUID(4, { message: "documentTypeId must to be uuid v4" })
    @IsNotEmpty()
    documentTypeId: string;

    @IsUUID(4, { message: "accountTypeId must to be uuid v4" })
    @IsNotEmpty()
    accountTypeId: string;

    @IsNumberString()
    document: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumberString()
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Length(5, 30)
    password: string;
}