import {IsString } from 'class-validator';

export class CreateAccountdto{

    @IsString()
    accountTypeId: string;

    @IsString()
    customer: string;
}