import { IsString } from "class-validator";

export class AccountTypeDto {
    @IsString()
    name: string;
}