// Libraries
import {
  
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  
  // Data transfer objects

  
  // Models
  import { CustomerModel } from '../../models';
  
  // Repositories
  import { CustomerRepository } from '../../persistence/repositories';
  
  // Services
  import { AccountService } from '../account';
import { AccountModel } from '../../models/account.model';
  
  // Entities
  import {
    AccountEntity,
    AccountTypeEntity,
    CustomerEntity,
  } from '../../persistence/entities';
  
  @Injectable()
  export class SecurityService {
    constructor(
      
      private readonly customerRepository: CustomerRepository,
      private readonly accountService: AccountService,
    ) {}
  
    /**
     * Identificarse en el sistema
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signIn(user: CustomerModel): string {
      const jwt = require('jsonwebtoken');

      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.email,
        user.password,
      );
      if (answer) return jwt.sign({id: user.id}, process.env.TOKEN_SECRET )
      else throw new UnauthorizedException();
    }
  
    /**
     * Crear usuario en el sistema
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signUp(user: CustomerModel): string {
      const newCustomer = new CustomerEntity();
      newCustomer.documentType = user.documentType
      newCustomer.document = user.document;
      newCustomer.fullName = user.fullName;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;
      newCustomer.name = user.name;      
      newCustomer.documentType.id = user.documentType.id
      newCustomer.documentType.name = user.documentType.name
      newCustomer.documentType.state = user.documentType.state

  
      const customer = this.customerRepository.register(newCustomer);
  
      if (customer) {
        const jwt = require('jsonwebtoken');

        const accountType = new AccountTypeEntity();
        accountType.id =  user.id;
        const newAccount  = new AccountEntity()
         newAccount.customer = customer;
         newAccount.accountType = accountType;
        
        const   account = this.accountService.createAccount(newAccount);

  
        if (account) return jwt.sign({id: accountType.id}, process.env.TOKEN_SECRET );
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
      const jwt = require('jsonwebtoken');
      jwt.invalidate(JWToken, process.env.TOKEN_SECRET);
    }
  }