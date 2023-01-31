import { IsUUID } from 'class-validator';

export class CreateAccountDto {

    @IsUUID(4, { message: "This must be UUID" })
    accountTypeId: string

    @IsUUID(4, { message: "This must be UUID" })
    customerId: string
}