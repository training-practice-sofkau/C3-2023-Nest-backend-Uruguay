// Libraries
import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';

import  jwt  from 'jsonwebtoken';


  // Data transfer objects


  // Models
  import { CustomerModel } from '../../models';

  // Repositories
  import { CustomerRepository } from '../../persistence/repositories';

  // Services
  import { AccountService } from '../account';

  // Entities
  import { AccountTypeEntity, CustomerEntity, AccountEntity } from '../../persistence/entities';



  @Injectable()
  export class SecurityService {

    constructor(
      private readonly customerRepository: CustomerRepository,
      private readonly accountService: AccountService,
    ) {}

    /**
     * Login to the system -
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signIn(user: CustomerModel): string {
      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.email,
        user.password,
      );
      if (answer){                
        return jwt.sign({id:user.id}, process.env.SECRET_KEY || 'secretToken');
      } 
      else throw new UnauthorizedException();
    }

    /**
     * Create a new user
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signUp(user: CustomerModel): string {

      const newCustomer = new CustomerEntity();
      
      newCustomer.documentType = user.documentType;
      newCustomer.document = user.document;
      newCustomer.fullname = user.fullname;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;

      const customer = this.customerRepository.register(newCustomer);

      if (customer) {
        const accountType = new AccountTypeEntity();
        accountType.id = accountType.id;      

        const newAccount = new AccountEntity();
        
        newAccount.customerId = customer;
        newAccount.accountTypeId = accountType;       

        const account = this.accountService.createAccount(newAccount);

        if (account) return jwt.sign({id: customer.id}, process.env.SECRET_KEY || 'secretToken');
        
        else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }

    /**
     * Salir del sistema
     *
     * @param {string} JWToken
     * @memberof SecurityService
     */
    signOut(JWToken: string): void {
      
        //TODO: I didn't find a way to remove JWToken from client side.
        // Maybe I can make a blacklist of used tokens and check that
        // the request is not coming from a invalid or already spent token.
    }
  }