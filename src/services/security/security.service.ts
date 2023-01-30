import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccountEntity } from 'src/persistence/entities/account-entity';
import { AccountTypeEntity } from 'src/persistence/entities/account-type-entity';
import { CustomerEntity } from 'src/persistence/entities/customer-entity';
import { CustomerRepo } from 'src/persistence/repositories/CustomerRepo';
import { AccountService } from '../account';
import { ICustomerModel } from 'src/models/i-customer-model';
import { Response } from 'express';
import  jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { SignInDto } from 'src/dtos/sign-in-dto';
import { SignUpDto } from 'src/dtos/sign-up-dto';
import { DocumentTypeEntity } from 'src/persistence/entities/document-type-entity';

@Injectable()
export class SecurityService {
    constructor(private readonly customerRepository: CustomerRepo,
                private readonly accountService: AccountService) {}
    
     
      /**
     * Identificarse en el sistema
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signIn(user: SignInDto): string {
      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.username,
        user.password,
      );
      if (answer) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest");
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
      const newCustomer = new CustomerEntity();

      const documentType = new DocumentTypeEntity();
      documentType.id = user.documentTypeId;

      newCustomer.documentType = documentType;
      newCustomer.document = user.document;
      newCustomer.fullName = user.fullName;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;
  
      const customer = this.customerRepository.register(newCustomer);
  
      if (customer) {
        
        const accountType = new AccountEntity();
        accountType.id = uuid();
        const newAccount = {
          ...customer,
          ...accountType,
        };
        const account = this.accountService.createAccount(newAccount);
        
        if (account) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest");
        else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }
  
    /**
     * Salir del sistema
     * @param {string} JWToken
     * @memberof SecurityService
     */
    signOut(JWToken: string): void {
      //implementar
    }
  }


