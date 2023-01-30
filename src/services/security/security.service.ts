import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CustomerRepository } from '../../persistence/repositories/';
import { AccountService } from '../account/';
import { CustomerEntity, AccountTypeEntity, AccountEntity } from '../../persistence/entities/';
import * as jwt from "jsonwebtoken"
import { SingInDTO } from '../../dtos/sing-in.dto';
import { SingUpDTO } from '../../dtos/sing-up-dto';
import { DocumentTypeEntity } from '../../persistence/entities/document-type.entity';
import { Response } from 'express';
import { AccountDTO } from '../../dtos/account.dto';
import { CreateAccountDTO } from '../../dtos/create-account.dto';

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
      signIn(user: SingInDTO): string {
        const answer = this.customerRepository.findOneByEmailAndPassword(
          user.username,
          user.password,
        );

        
        if (!answer) throw new UnauthorizedException();

        return jwt.sign({id: user.username}, process.env.TOKEN_SECRET || 'tokentest');
      }
    
      /**
       * Crear usuario en el sistema
       *
       * @param {CustomerModel} user
       * @return {*}  {string}
       * @memberof SecurityService
       */
      signUp(user: SingUpDTO): string {
        const documentType = new DocumentTypeEntity();
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
          const accountType = new AccountTypeEntity();
          accountType.id = 'Falta el ID por defecto del tipo de cuenta';
          let newAccount = new CreateAccountDTO();
          newAccount.customerId = customer.id;
          newAccount.accountTypeId = accountType.id;
    
          const account = this.accountService.createAccount(newAccount);
    
          if (account) throw new InternalServerErrorException();

          return jwt.sign({id: user.email}, process.env.TOKEN_SECRET || 'tokentest');
        } else throw new InternalServerErrorException();
      }
    
      /**
       * Salir del sistema
       *
       * @param {string} JWToken
       * @memberof SecurityService
       */
      signOut(JWToken: string): void {
        // res.clearCookie(JWToken);
      }
}
