import { IsUUID, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

import { DocumentTypeEntity } from '../../data/persistence/entities';

export class CustomerDto {

    @IsNotEmpty()
    @IsString({message: 'documentType must to be a valid id'})
    documentType: string;

    @IsString()
    document: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber('UY', {message: 'phone must to be a uruguayan valid phone number'})
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Length(5, 30)
    password: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    avatarUrl: string | undefined;


}