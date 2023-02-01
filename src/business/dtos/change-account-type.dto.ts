import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString } from 'class-validator';

export class ChangeAccountDto {

    @ApiProperty()
    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @ApiProperty()
    @IsString({ message: "account type name must to be a string" })
    accountTypeName: string;

}