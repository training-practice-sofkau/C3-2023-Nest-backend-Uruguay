import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AccountModel } from "src/Data";


export class TransferDto {
    @IsNotEmpty({ message: 'Outcome account is required' })
    outcome: AccountModel;
  
    @IsNotEmpty({ message: 'Income account is required' })
    income: AccountModel;
  
    @IsNotEmpty({ message: 'Transfer amount is required' })
    @IsNumber(undefined,{ message: 'Transfer amount must be a valid number' })
    transferAmount: number;
  
    @IsNotEmpty({ message: 'Transfer reason is required' })
    @IsString({ message: 'Transfer reason must be a valid string' })
    transferReason: string;
  
    @IsNotEmpty({ message: 'Date and time is required' })
    @IsDate({ message: 'Date and time must be a valid date' })
    dateTime: Date;
  
    @IsOptional()
    @IsDate({ message: 'Deleted at must be a valid date or number' })
    deletedAt?: Date | number;
  
    @IsNotEmpty({ message: 'Id is required' })
    @IsString({ message: 'Id must be a valid string' })
    id: string;
  
    @IsNotEmpty({ message: 'State is required' })
    state: boolean;
  }