import { IsUUID } from "class-validator";

export class ChangeAccountDto {

    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @IsUUID(4, { message: "account type id must to be uuid" })
    accountTypeId: string;

}