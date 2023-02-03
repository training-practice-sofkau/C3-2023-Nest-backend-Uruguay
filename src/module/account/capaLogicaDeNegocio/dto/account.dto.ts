import { IsBoolean, IsNumber, IsPositive, IsString } from "class-validator";

export class AccountDTO {

    @IsString({message: 'Id String Required'})
    accountType?: string;

    @IsNumber(undefined, {message: 'Balance: Se requiere que numero'})
    @IsPositive({message: 'Balance: Se requiere que sea Numero'})
    balance?: number;
  
    @IsBoolean({message: 'State: Se requiere que sea Boolean'})
    state?: boolean;
}