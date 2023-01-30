import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DocumentTypeModel } from 'src/models';

export class CustomerDtos {
  @IsNotEmpty({message: 'Document Type is required.'})
  documentType: DocumentTypeModel;

  @IsNotEmpty()
  @IsString({message: 'Please insert a valid document.' })
  document: string;

  @IsNotEmpty()
  @IsString({message: 'Enter your full name for your account.'})
  fullName: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Invalid phone number' } )
  @Matches(/^(?:\+\d{1,3}[- ]?)?\d{10,12}$/)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters.' })
  @MaxLength(30, { message: 'Password must have at most 30 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
  })
  password: string;

  @IsString({message: 'Please enter a valid avatar url'})
  avatarUrl?: string;

  @IsNotEmpty()
  @IsString({ message: 'Enter a name for your account.' })
  name: string;
}
