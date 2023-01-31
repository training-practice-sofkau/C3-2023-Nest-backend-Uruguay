import { IsBooleanString, IsUUID } from "class-validator";

export class ChangeStateDto {

    @IsUUID(4, { message: "account id must to be uuid" })
    accountId: string;

    @IsBooleanString({ message: 'the state is not an boolean.' })
    state: boolean;

}