import { IsString } from "class-validator"

export class ChangeAccountTypeDto {

    @IsString()
    accountId: string

    @IsString()
    accountTypeId: string
}