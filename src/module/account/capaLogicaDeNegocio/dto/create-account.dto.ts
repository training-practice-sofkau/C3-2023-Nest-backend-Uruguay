import { IsUUID } from 'class-validator';

export class CreateAccountdto{

    @IsUUID(4, { message: "this must to be uuid" })
    accountTypeId: string;

    @IsUUID(4, { message: "this must to be uuid" })
    customer: string;
}