import { IsUUID, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsNumberString } from 'class-validator';

export class UpdateCustomerDto {

    @IsOptional()
    @IsNotEmpty()
    @IsUUID(4, {message: 'documentType must to be a valid uuid'})
    documentType: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    document: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsPhoneNumber('UY', {message: 'phoneNumber must to be a uruguayan valid phone number'})
    @IsNumberString()
    @IsNotEmpty()
    phone: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    avatarUrl: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;

    @IsOptional()
    @IsDate()
    @IsNotEmpty()
    daletedAt: number | Date;

}