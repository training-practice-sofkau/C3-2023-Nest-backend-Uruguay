import { IsUUID, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

import { DocumentTypeModel } from '../models';

export class PatchCustomerDto {

    @IsOptional()
    @IsUUID(4,{message: 'uuid must to be a valid v4 UUID'})
    id: string;

    @IsOptional()
    @IsNotEmpty()
    documentType: DocumentTypeModel;

    @IsOptional()
    @IsString()
    document: string;

    @IsOptional()
    @IsString()
    fullName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsPhoneNumber('UY', {message: 'phoneNumber must to be a uruguayan valid phone number'})
    @IsString()
    phone: string;

    @IsOptional()
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