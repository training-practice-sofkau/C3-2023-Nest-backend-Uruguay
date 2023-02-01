import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccountEntity } from 'src/data-access/entities/account-entity';
import { AccountTypeEntity } from 'src/data-access/entities/account-type-entity';
import { CustomerEntity } from 'src/data-access/entities/customer-entity';
import { CustomerRepo } from 'src/data-access/repositories/CustomerRepo';
import { AccountService } from '../account';
import { Response } from 'express';
import * as jwt from "jsonwebtoken"
import { SignInDto } from 'src/business-logic/dtos/sign-in-dto';
import { SignUpDto } from 'src/business-logic/dtos/sign-up-dto';
import { DocumentTypeEntity } from 'src/data-access/entities/document-type-entity';
import { DocumentTypeRepository } from 'src/data-access/repositories/DocumentTypeRepo';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class SecurityService {
    constructor(private readonly customerRepository: CustomerRepo,
                private readonly accountService: AccountService,
                private readonly documentTypeRepository : DocumentTypeRepository) {}
    
     
    signIn(user: SignInDto): string {
      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.username,
        user.password,
      );
      if (answer) return answer.valueOf().toString()  
      else throw new UnauthorizedException();
    }
  
    
    signUp(userDto: SignUpDto): Array<Object> {
      const newCustomer = new CustomerEntity();
      const documentType = new DocumentTypeEntity();

      documentType.name = userDto.documentTypeName; //NAME ES EL UNICO DATO QUE LE TENGO QUE PASAR A EL DOCUMENT TYPE ENTITY 

      newCustomer.documentType = documentType; //AL ATRIBUTO DE CUSTOMER ENTITY LE PASO UN DOCUMENT TYPE ENTITY (LA RELACION)
      newCustomer.document = userDto.document;
      newCustomer.fullName = userDto.fullName;
      newCustomer.email = userDto.email;        //CON EL DTO COMPLETO LOS ATRIBUTOS DEL NUEVO CUSTOMER
      newCustomer.phone = userDto.phone;
      newCustomer.password = userDto.password;
  
      const customer = this.customerRepository.register(newCustomer);  //AGREGO EL NUEVO CUSTOMER A EL ARRAY DE CUSTOMERS
      this.documentTypeRepository.register(documentType);       //AGREGO EL NUEVO DOCUMENT TYPE A EL ARRAY DE DOCUMENT TYPE
  
      if (customer) {
        
        const accountType = new AccountTypeEntity();
        const newAccount = new AccountEntity();
        
        accountType.name = userDto.accountTypeName;  //LE ASIGNO EL NOMBRE AL TIPO DE CUENTA, POSIBLES CAJA AHORRO, CUENTA CORRIENTE
        
        newAccount.accountTypeId = accountType;
        newAccount.customerId = customer; 
        newAccount.balance = userDto.balance || 0;
        
        const account = this.accountService.createAccount(newAccount); //AGREGO LA NUEVA CUENTA A EL ARRAY DE ACCOUNT
        
        console.log(account.balance)

        if (account)
        
      //return customer.fullName 
      return  [account, jwt.sign(userDto, process.env.TOKEN_SECRET || "tokentest")]
         //return account

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


