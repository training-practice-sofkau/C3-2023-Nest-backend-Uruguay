// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
  
  // Data transfer objects

  
  // Models
  import { AccountModel, CustomerModel } from '../../models';
  
  // Repositories
  import { CustomerRepository } from '../../persistence/repositories';
  
  // Services
  import { AccountService } from '../account';
  
  // Entities
  import {
    AccountTypeEntity,
    CustomerEntity,
  } from '../../persistence/entities';
import { JsonWebTokenError } from 'jsonwebtoken';
  
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
      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.email,
        user.password,
      );
      const token: string = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET || 'tokentest');

      if (answer) return token;
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
      newCustomer.documentType = user.documentType;
      newCustomer.document = user.document;
      newCustomer.fullName = user.fullName;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;
  
      const customer = this.customerRepository.register(newCustomer);
  
      if (customer) {
        const accountType = new AccountTypeEntity();
        accountType.id = uuid(); //'Falta el ID por defecto del tipo de cuenta'
        
        const newAccount: AccountModel = {
          customer,
          accountType,
          id: '',
          balance: 0,
          state: true
        };
  
        const account = this.accountService.createAccount(newAccount);

        const token: string = jwt.sign({_id: newAccount.id}, process.env.TOKEN_SECRET || 'tokentest');
  
        if (account) return token;
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
      throw new Error('Method not implemented.');
    }
  }