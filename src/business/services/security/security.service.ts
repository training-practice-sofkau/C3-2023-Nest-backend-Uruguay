// Libraries
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';

import jwt from 'jsonwebtoken';


// Data transfer objects


// Models

// Repositories
import { CustomerRepository } from '../../../data/persistence/repositories';

// Services
import { AccountService } from '../account';

// Entities
import { AccountTypeEntity, CustomerEntity } from '../../../data/persistence/entities';
import { SignInDto, SignUpDto, CreateAccountDto } from '../../dtos';
import { DocumentTypeEntity } from '../../../data/persistence/entities';





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
      return 'Here goes JWT (jsonwebtoken gives error right now, is disabled now) -> But Sign In is working '
      //jwt.sign({ id: user.username }, 'secretToken', { expiresIn: "1h" }); // process.env.SECRET_KEY || 
    }

    throw new UnauthorizedException();

  }

  /**
   * Create a new user
   * @param {SignUpDto} user
   * @return {*}  {string}   
   */
   signUp(user: SignUpDto): string {

    const documentType = new DocumentTypeEntity();
    documentType.id = user.documentTypeId;

    const newCustomer = new CustomerEntity();

    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullname = user.fullname;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      
      const accountType = new AccountTypeEntity();      

      const newAccount = new CreateAccountDto();

      newAccount.customerId = customer.id;
      newAccount.accountTypeId = accountType.id;

      const account = this.accountService.createAccount(newAccount);      

      if (account) {

        //TODO: jwt throw errors, is disable now but needs to be checked

        return 'Here goes JWT (jsonwebtoken gives error right now, is disabled now) -> But SignUp is working '
        // jwt.sign({ id: customer.email }, process.env.SECRET_KEY || 'secretToken');
        
      }else{
        
        throw new Error('Error creating Account');
      }
    
    } else {     
      
      throw new InternalServerErrorException("Something went wrong!");
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