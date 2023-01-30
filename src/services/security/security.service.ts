// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
  
  // Data transfer objects
  import { SignOutDto, SignUpDto, SignInDto, AccountDto } from '../../dtos';

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
    DocumentTypeEntity,
  } from '../../persistence/entities';
  
  @Injectable()
  export class SecurityService {
    constructor(
      private readonly customerRepository: CustomerRepository,
      private readonly accountService: AccountService,
    ) {}
  
    /**
     * Identificarse en el sistema
     */
    signIn(user: SignInDto): string {
      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.username,
        user.password,
      );
      const token: string = jwt.sign({id: user.id}, process.env.TOKEN_SECRET || 'tokentest');

      if (answer) return token;
      else throw new UnauthorizedException();
    }
  
    /**
     * Crear usuario en el sistema
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
        const accountType = new AccountTypeEntity();
        // accountType.id = ;
        
        const newAccount = {
          customer,
          accountType,
        };
  
        const account = this.accountService.createAccount(newAccount);

        const token: string = jwt.sign({id: account.id}, process.env.TOKEN_SECRET || 'tokentest');
  
        if (account) return token;
        else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }
  
    /**
     * Salir del sistema
     */
    // signOut(JWToken: string): void {
    //   const jwtPayload = jwt.verify(JWToken, process.env.TOKEN_SECRET || 'tokentest');
      
    //   if(jwtPayload instanceof Object) {
    //     const account = <SignOutDto>jwtPayload;
    //     this.accountService.changeState(account.id, false);
    //   }
    //   else throw new InternalServerErrorException();
    // }
    
  }