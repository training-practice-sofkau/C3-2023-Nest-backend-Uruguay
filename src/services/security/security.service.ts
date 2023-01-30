// Libraries
import {
  
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  
  // Data transfer objects

  
  // Models
  
  // Repositories
  import { CustomerRepository } from '../../persistence/repositories';
  
  // Services
  import { AccountService } from '../account';
  
  // Entities
  import {
    AccountEntity,
    AccountTypeEntity,
    CustomerEntity,
    DocumentTypeEntity,
  } from '../../persistence/entities';
import { SignInDto, SignUpDto } from 'src/dtos';
  
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
    signIn(user: SignInDto): string {
      const jwt = require('jsonwebtoken');

      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.username,
        user.password,
      );
      if (answer) return "any"
      else throw new UnauthorizedException();
    }
  
    /**
     * Crear usuario en el sistema
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signUp(user: SignUpDto): string {

      const documentType = new DocumentTypeEntity()
      documentType.id = user.documentTypeId;

      const newCustomer = new CustomerEntity();
      newCustomer.documentType = documentType;
      newCustomer.document = user.document;
      newCustomer.fullName = user.fullName;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;

  
      const customer = this.customerRepository.register(newCustomer);
  
      if (customer) {
        const jwt = require('jsonwebtoken');

        const accountType = new AccountTypeEntity();
        accountType.id =  customer.id;
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