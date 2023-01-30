// Libraries
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import jwt from 'jsonwebtoken';


// Data transfer objects


// Models
import { CustomerModel } from '../../models';

// Repositories
import { CustomerRepository } from '../../persistence/repositories';

// Services
import { AccountService } from '../account';

// Entities
import { AccountTypeEntity, CustomerEntity } from '../../persistence/entities';
import { SignInDto, SignUpDto, CreateAccountDto } from '../../dtos';
import { DocumentTypeEntity } from '../../persistence/entities/document-type.entity';




@Injectable()
export class SecurityService {

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) { }

  /**
   * Login to the system -
   *
   * @param {SignInDto} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.username,
      user.password,
    );
    if (answer) {
      return jwt.sign({ id: user.username }, 'secretToken', { expiresIn: "1h" }); // process.env.SECRET_KEY || 
    }

    throw new UnauthorizedException();

  }

  /**
   * Create a new user
   * @param {SignUpDto} user
   * @return {*}  {string}   
   */
   signUp(user: SignUpDto): string {

    const newDocumentType = new DocumentTypeEntity();
    newDocumentType.id = user.documentTypeId;

    const newCustomer = new CustomerEntity();

    newCustomer.documentType = newDocumentType;
    newCustomer.document = user.document;
    newCustomer.fullname = user.fullname;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountType = new AccountTypeEntity();
      accountType.id = accountType.id;

      const newAccount = new CreateAccountDto();

      newAccount.customerId = customer.id;
      newAccount.accountTypeId = accountType.id;

      const account = this.accountService.createAccount(newAccount);      

      if (account) {

        //TODO: jwt throw errors, is disable now but needs to be checked

        return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjcxM2M3OGI4MTYwM2YxNjA0ZjNmNGU4ZTVhNzQ4MzEwIn0.e30.1OmZZ-XrYqB3c7teD7X10kuaMX8BQcAOs9IR77j7iNRRdcMa8ry5pNbR0idTsdYo8uelYR1BnM1AfrXIhmUr1w'
        // jwt.sign({ id: customer.email }, process.env.SECRET_KEY || 'secretToken');
        
      }else{
        
        throw new Error('cuenta no creada');
      }
    
    } else {     
      
      throw new Error("something went wrong!");
    }    
    
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {

    const token = jwt.verify(JWToken, 'secretToken') as string; // process.env.SECRET_KEY || 

    if (token === this.customerRepository.findOneByEmail(token).email) { // verify the user email

      console.log('Logging Out!');

      //TODO: save token in a blocklist to check from unauthorized possible future access until expires

    }
  }
}