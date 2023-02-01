import { IsString } from "class-validator";

export class CreateAccountDTO {

    @IsString({message: 'An Id String required'})
    customerId: string;

    @IsString({message: 'An Id String required'})
    accountTypeId: string;
}