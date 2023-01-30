import { IsNotEmpty, IsUUID, IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsUrl } from 'class-validator';
import { DocumentTypeEntity } from "src/persistence";
import { v4 as uuid } from 'uuid';

export class CustomerDto {

    @IsUUID(4, { message: "this must to be uuid" })
    id = uuid();

    @IsNotEmpty({ message: ' This field should not be empty' })
    documentType: DocumentTypeEntity;

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
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: 'Password too weak' },
    )
    password: string;

    @IsString({ message: ' This field should be a string' })
    @IsUrl()
    @IsOptional()
    avatarUrl?: string;

    state = true;

}



