import { IsBooleanString, IsUUID } from "class-validator";

export class CreateDepositDto {

    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @IsBooleanString({ message: 'the state is not a boolean.' })
    state: string;

}