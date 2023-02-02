// Libraries
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';


// Data transfer objects


// Models

// Repositories
import { CustomerRepository } from '../../../data/persistence/repositories';

// Services
import { AccountService } from '../account';

// Entities
import { CustomerEntity } from '../../../data/persistence/entities';
import { SignInDto, SignUpDto, CreateAccountDto } from '../../dtos';
import { DocumentTypeRepository } from '../../../data/persistence/repositories/document-type.repository';
import { AccountTypeRepository } from '../../../data/persistence/repositories/account-type.repository';



@Injectable()
export class SecurityService {

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly accountService: AccountService,
    private jwtService: JwtService
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
      //return 'Here goes JWT (jsonwebtoken gives error right now, is disabled now) -> But Sign In is working '
      return this.jwtService.sign({ id: user.username, pass: user.password }); //, 'secretToken', { expiresIn: "1h" }); // process.env.SECRET_KEY || 
    }

    throw new UnauthorizedException();

  }

  /**
   * Create a new user
   * @param {SignUpDto} user
   * @return {*}  {string}   
   */
  signUp(user: SignUpDto): string {

    const documentType = this.documentTypeRepository.findOneById(user.documentTypeId);

    if (documentType) {
      const newCustomer = new CustomerEntity();

      newCustomer.documentType = documentType;
      newCustomer.document = user.document;
      newCustomer.fullname = user.fullname;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;

      const customer = this.customerRepository.register(newCustomer);

      if (customer) {

        const accountType = this.accountTypeRepository.findOneById(user.accountTypeId);
        if (accountType) {
          const newAccount = new CreateAccountDto();

          newAccount.customerId = customer.id;
          newAccount.accountTypeId = accountType.id;

          const account = this.accountService.createAccount(newAccount);

          if (account) {

            //TODO: jwt throw errors, is disable now but needs to be checked
            return this.jwtService.sign({ id: customer.id });
            
          } else{

            throw new Error('Error creating Account');  
          }
        } else {

          throw new Error('Account Type Not valid!');
        }

      } else {

        throw new Error("New Customer cannot be created!");
      }
    } else {

      throw new Error('Document Type not found!');
    }

  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {

    try {

      const tokenValidation = this.jwtService.verify(JWToken);

      if (this.customerRepository.findOneByEmailAndPassword(tokenValidation.id, tokenValidation.pass)) {

        console.log(`User: ${tokenValidation.id} - Pass: ${tokenValidation.pass}`);
        console.log("Logging Out!")
      }

    } catch (err) {
      throw new InternalServerErrorException("Token expired or something went wrong! Not logging Out!");
    }


    //TODO: save token in a blocklist to check from unauthorized possible future access until expires

  }
}
