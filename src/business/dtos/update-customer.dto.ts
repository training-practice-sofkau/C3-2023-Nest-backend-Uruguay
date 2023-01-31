import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsUUID, IsOptional, IsString, IsEmail, IsUrl, Min } from 'class-validator';

export class UpdateCustomerDto {

    @ApiProperty()
    @IsUUID(4, { message: "customer id must to be uuid." })
    customerId: string;

    @ApiProperty()
    @IsUUID(4, { message: "document type id must to be uuid." })
    documentTypeId: string;

    @ApiProperty()
    @IsNumberString(undefined, { message: 'the document must to be a number.' })
    document: string;

    @ApiProperty()
    @IsString({ message: 'the full name is not a string.' })
    fullName: string;

    @ApiProperty()
    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    email: string;

    @ApiProperty()
    @IsNumberString({ message: "phne must to be a number." })
    phone: string;

    @ApiProperty()
    @IsString({ message: "password is not a string." })
    @Min(5)
    password: string;

    @ApiProperty()
    @IsUrl({ message: "avatar url must to be a url." })
    @IsOptional()
    avatarUrl?: string;

}