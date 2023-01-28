import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccountEntity } from 'src/persistence/entities/account-entity';
import { AccountTypeEntity } from 'src/persistence/entities/account-type-entity';
import { CustomerEntity } from 'src/persistence/entities/customer-entity';
import { CustomerRepo } from 'src/persistence/repositories/CustomerRepo';
import { AccountService } from '../account';
import { ICustomerModel } from 'src/models/i-customer-model';
import { Response } from 'express';
import  jwt from 'jsonwebtoken';

@Injectable()
export class SecurityService {
    constructor(private readonly customerRepository: CustomerRepo,
                private readonly accountService: AccountService) {}
    
      /**
       * Identificarse en el sistema
       *
       * @param {CustomerModel} user
       * @return {*}  {string}
       * @memberof SecurityService
       */
      signIn(user: ICustomerModel): string {
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
      signUp(user: ICustomerModel): string {
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

