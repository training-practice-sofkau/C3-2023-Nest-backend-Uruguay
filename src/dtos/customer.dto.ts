import { IsNotEmpty, IsUUID, IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsUrl } from 'class-validator';
import { DocumentTypeEntity } from "src/persistence";
import { v4 as uuid } from 'uuid';

export class CustomerDto {

    @IsUUID(4, { message: "this must to be uuid" })
    id = uuid();

    @IsNotEmpty({ message: ' is required.' })
    documentType: DocumentTypeEntity;

    @IsNotEmpty()
    @IsString()
    document: string;

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: 'Password too weak' },
    )
    password: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    avatarUrl?: string;

    state = true;

}


