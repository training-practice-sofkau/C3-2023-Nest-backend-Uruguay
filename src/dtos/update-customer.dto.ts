import { IsNumberString, IsUUID, IsBoolean, IsDate, IsOptional, IsString, IsEmail, IsUrl, Min } from 'class-validator';

export class UpdateCustomerDto {

    @IsUUID(4, { message: "customer id must to be uuid." })
    customerId: string;

    @IsUUID(4, { message: "document type id must to be uuid." })
    documentTypeId: string;

    @IsNumberString(undefined, { message: 'the document must to be a number.' })
    document: string;

    @IsString({ message: 'the full name is not a string.' })
    fullName: string;

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    email: string;

    @IsNumberString({ message: "phne must to be a number." })
    phone: string;

    @IsString({ message: "password is not a string." })
    @Min(5)
    password: string;

    @IsUrl({ message: "avatar url must to be a url." })
    @IsOptional()
    avatarUrl?: string;

}