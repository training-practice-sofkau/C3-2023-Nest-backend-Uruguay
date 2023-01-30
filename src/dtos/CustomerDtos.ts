import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DocumentTypeModel } from 'src/models';

export class CustomerDtos {
  @IsNotEmpty({ message: 'Document Type is required.' })
  documentType: DocumentTypeModel;

  @IsNotEmpty({ message: 'Document is required.' })
  @IsString({ message: 'Please insert a valid document.' })
  document: string;

  @IsNotEmpty({ message: 'Full Name is required.' })
  @IsString({ message: 'Enter your full name for your account.' })
  fullName: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail(undefined, { message: 'The email is not a valid format.' })
  email: string;

  @IsNotEmpty({ message: 'Phone is required.' })
  @IsString({ message: 'Invalid phone number' })
  @Matches(/^(?:\+\d{1,3}[- ]?)?\d{10,12}$/, { message: 'Phone number is invalid.' })
  phone: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must have at least 8 characters.' })
  @MaxLength(30, { message: 'Password must have at most 30 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
  })
  password: string;

  @IsString({ message: 'Avatar URL must be a string.' })
  @IsOptional()
  avatarUrl?: string;

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Enter a name for your account.' })
  name: string;

  @IsNotEmpty({ message: 'ID is required.' })
  @IsUUID(4, { message: 'ID must be a valid UUID version 4.' })
  id: string;

  @IsNotEmpty({ message: 'State is required.' })
  state: boolean;
}
