import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class ChangeAccountDto {

    @ApiProperty()
    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @ApiProperty()
    @IsUUID(4, { message: "account type id must to be uuid" })
    accountTypeId: string;

}