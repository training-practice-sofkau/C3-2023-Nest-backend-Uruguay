import { IsUUID, IsNumber, IsPositive } from 'class-validator';

export class CreateAccountDto {

    @IsUUID(4, { message: "This must be UUID" })
    accountTypeId: string
}