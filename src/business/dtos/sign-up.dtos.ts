import { IsUUID, IsNumberString, IsString, IsEmail } from "class-validator";

export class SignUpDto {

  @IsUUID(4, { message: 'This must be a valid UUID version 4' })
  documentTypeId: string;

  @IsNumberString(undefined,{ message: 'This must be a string of numbers' })
  document: string;

  @IsString({ message: 'This must be a string' })
  fullName: string;

  @IsEmail(undefined, { message: 'This must be a valid email address' })
  email: string;

  @IsNumberString(undefined, { message: 'This must be a string of numbers' })
  phone: string;

  @IsString({ message: 'This must be a string' })
  password: string;
}