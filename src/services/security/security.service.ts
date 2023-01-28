// Libraries
import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { v4 as uuid } from 'uuid';
  // Data transfer objects

  
  // Models
  import { CustomerModel } from '../../models';
  
  // Repositories
  import { CustomerRepository } from '../../persistence/repositories';
  
  // Services
  import { AccountService } from '../account';
  
  // Entities
  import {
    AccountTypeEntity,
    CustomerEntity,
  } from '../../persistence/entities';
  // JWT
  import * as jwt from "jsonwebtoken"
import { AccountEntity } from '../../persistence/entities/account.entity';

  
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
      if (answer) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest")
      else throw new UnauthorizedException()
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
        const accountType = new AccountEntity()
        accountType.id = uuid();
        const newAccount = {
          ...customer,
          ...accountType,
        };
        const account = this.accountService.createAccount(newAccount)
        
        if (account) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest")
        else throw new InternalServerErrorException()
      } else throw new InternalServerErrorException()
    }
  
    /**
     * Salir del sistema
     *
     * @param {string} JWToken
     * @memberof SecurityService
     */
    signOut(JWToken: string): void {

    }
  }