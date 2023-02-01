import { IsUUID, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

import { DocumentTypeEntity } from '../../data/persistence/entities';

export class CustomerDto {

    @IsOptional()
    @IsUUID(4,{message: 'uuid must to be a valid v4 UUID'})
    id: string;

    @IsNotEmpty({message: 'documentType must have a name'})
    documentType: DocumentTypeEntity;

    @IsString()
    document: string;

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('UY', {message: 'phone must to be a uruguayan valid phone number'})
    @IsString()
    phone: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Length(5, 30)
    password: string;
    
    @IsOptional()
    @IsString()
    avatarUrl?: string | undefined;

    @IsOptional()
    @IsBoolean()
    state: boolean;

    @IsOptional()
    @IsDate()
    daletedAt?: number | Date | undefined;

}