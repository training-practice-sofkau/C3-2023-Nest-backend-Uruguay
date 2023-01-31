import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class DepositDto {
  @IsNotEmpty({message: 'This validation will ensure that the property is not undefined or null..'})
  @IsUUID(4, { message: "this must to be uuid" })
  accountId: string;

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber(undefined,{ message: 'Amount must be a valid number' })
  amount: number;

  @IsNotEmpty({ message: 'Date and time is required' })
  @IsDate({ message: 'Date and time must be a valid date' })
  date_time: Date;

  @IsNotEmpty({ message: 'Id is required' })
  @IsString({ message: 'Id must be a valid string' })
  id: string;

  @IsNotEmpty({ message: 'State is required' })
  state: boolean;
}