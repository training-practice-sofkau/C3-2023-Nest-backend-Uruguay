import { IsUUID } from "class-validator";

export class CreateAccountDto {

    @IsUUID(4, { message: "This must to be uuid." })
    customerId: string;

    @IsUUID(4, { message: "This must to be uuid." })
    accountTypeId: string;
}