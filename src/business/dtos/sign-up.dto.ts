import { IsEmail,IsNumberString, IsUUID, IsString, Matches, Min, IsNotEmpty } from 'class-validator';

export class SignUpDto {

    @IsUUID(4, { message: "this must to be uuid" })
    @IsNotEmpty({ message: "This slot must not be empty."})
    documentTypeId: string;

    @IsNumberString()
    @IsNotEmpty({ message: "This slot must not be empty."})
    document: string;

    @IsString()
    @IsNotEmpty({ message: "This slot must not be empty."})
    fullName: string;

    @IsEmail(undefined, { message: 'The data provider is not a valid email.' })
    @IsNotEmpty({ message: "This slot must not be empty."})
    email: string;

    @IsNumberString()
    @IsNotEmpty({ message: "This slot must not be empty."})
    phone: string;

    @IsNotEmpty({ message: 'The password is required.' })
    @IsString()
    @Min(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
    })
    password: string;
}