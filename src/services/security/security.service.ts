import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CustomerRepository } from '../../persistence/repositories/';
import { AccountService } from '../account/';
import { CustomerModel } from '../../models/';
import { CustomerEntity, AccountTypeEntity, AccountEntity } from '../../persistence/entities/';
import jwt  from 'jsonwebtoken';
import { Response } from 'express';

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

        
        if (!answer) throw new UnauthorizedException();

        return jwt.sign({id: user.id}, process.env.TOKEN_SECRET || 'tokentest');
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
          accountType.id = 'Falta el ID por defecto del tipo de cuenta';
          let newAccount = new AccountEntity();
          newAccount = {
            ...newAccount,
            customer,
            accountType,
          };
    
          const account = this.accountService.createAccount(newAccount);
    
          if (account) throw new InternalServerErrorException();

          return jwt.sign({id: user.id}, process.env.TOKEN_SECRET || 'tokentest');
        } else throw new InternalServerErrorException();
      }
    
      /**
       * Salir del sistema
       *
       * @param {string} JWToken
       * @memberof SecurityService
       */
      signOut(JWToken: string, res: Response): void {
        res.clearCookie(JWToken);
      }
}
