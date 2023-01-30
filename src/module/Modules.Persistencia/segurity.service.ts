import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  
import jwt  from 'jsonwebtoken';
import { Response } from 'express';
import { CustomerEntity } from 'src/module/customer/customer.entity';
import { AccountTypeEntity } from 'src/module/account/account.Type.Entity';
import { v4 as uuid } from 'uuid';
import { AccountEntity } from '../account/account.entities';
import { AccountService } from 'src/module/account/service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CustomerRepository, DocumentTypeEntity } from '../customer';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CreateAccountdto } from '../account/dto/create-account.dto';


@Injectable()
export class SegurityService {
  constructor(
      private readonly customerRepository: CustomerRepository,
      private readonly accountService: AccountService,
    ) {}
      

  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.username,
      user.password
    );
    if (!answer)  throw new UnauthorizedException();
    
    return jwt.sign({id: user.username},process.env.TOKEN_SECRET || `tokentest`);
  }

  signUp(user: SignUpDto): string {
    const documentType= new DocumentTypeEntity();
    documentType.id = user.documentTypeId

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;
    
    const customer = this.customerRepository.register(newCustomer);

    if (!customer) throw new InternalServerErrorException();
    
    const accountType = new AccountTypeEntity();
    accountType.id = uuid()

    
    let newAccount = new AccountEntity();
    newAccount.coustomer_id = customer


    newAccount.account_type_id = accountType;

    const newCreateAccount = new CreateAccountdto();
    newCreateAccount.accountTypeId =  accountType.id;

    const account = this.accountService.createAccount(newCreateAccount);

    if (!account) throw new InternalServerErrorException();
    
    
    return jwt.sign({_id: account.id},process.env.TOKEN_SECRET || ` tokentest`) ;  
  }

  signOut(JWToken: string , res:Response): void {
    res.clearCookie(JWToken);
  }
}
