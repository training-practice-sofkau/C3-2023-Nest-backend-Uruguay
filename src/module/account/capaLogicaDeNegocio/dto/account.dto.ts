import { IsBoolean, IsNumber, IsPositive, IsString } from "class-validator";

export class AccountDTO {

    @IsString({message: 'Id String Required'})
    accountType?: string;

    @IsNumber(undefined, {message: 'Balance: Number required'})
    @IsPositive({message: 'Balance: Number positive requiered'})
    balance?: number;
  
    @IsBoolean({message: 'State: Boolean required'})
    state?: boolean;
}