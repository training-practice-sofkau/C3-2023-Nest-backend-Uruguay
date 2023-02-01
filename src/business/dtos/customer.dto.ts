import { IsUUID, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

import { DocumentTypeModel } from '../../data/models';

export class CustomerDto {

    @IsOptional()
    @IsUUID(4,{message: 'uuid must to be a valid v4 UUID'})
    id: string;

    @IsNotEmpty()
    documentType: DocumentTypeModel;

    @IsString()
    document: string;

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('UY', {message: 'phoneNumber must to be a uruguayan valid phone number'})
    @IsString()
    phone: string;

    @IsString()
    @IsNotEmpty()
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