import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccountEntity } from 'src/data-access/entities/account-entity';
import { AccountTypeEntity } from 'src/data-access/entities/account-type-entity';
import { CustomerEntity } from 'src/data-access/entities/customer-entity';
import { CustomerRepo } from 'src/data-access/repositories/CustomerRepo';
import { AccountService } from '../account';
import { Response } from 'express';
import  jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { SignInDto } from 'src/data-access/dtos/sign-in-dto';
import { SignUpDto } from 'src/data-access/dtos/sign-up-dto';
import { DocumentTypeEntity } from 'src/data-access/entities/document-type-entity';
import { DocumentTypeRepository } from 'src/data-access/repositories/DocumentTypeRepo';

@Injectable()
export class SecurityService {
    constructor(private readonly customerRepository: CustomerRepo,
                private readonly accountService: AccountService,
                private readonly documentTypeRepository : DocumentTypeRepository) {}
    
     
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
      if (answer) return answer.valueOf().toString()  
      else throw new UnauthorizedException();
    }
  
    /**
     * Crear usuario en el sistema
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signUp(userDto: SignUpDto): string {
      const newCustomer = new CustomerEntity();
      const documentType = new DocumentTypeEntity();

      documentType.name = userDto.documentTypeName; //Completo el document type

      newCustomer.documentType = documentType;
      newCustomer.document = userDto.document;
      newCustomer.fullName = userDto.fullName;
      newCustomer.email = userDto.email;
      newCustomer.phone = userDto.phone;
      newCustomer.password = userDto.password;
  
      const customer = this.customerRepository.register(newCustomer);
      this.documentTypeRepository.register(documentType); 
  
      if (customer) {
        
        const accountType = new AccountTypeEntity();
        accountType.name = userDto.accountTypeName;
        const newAccount = new AccountEntity();

       newAccount.accountTypeId = accountType;
       newAccount.balance = userDto.balance || 0;
       newAccount.customerId = customer; //Esto es todo el customer

        const account = this.accountService.createAccount(newAccount);
        
        if (account) return customer.fullName
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


