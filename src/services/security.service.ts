  import { Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';

  import { v4 as uuid } from 'uuid';
  
  // Data transfer objects
  import { CreateAccountDto, SignInDto, SignUpDto } from '../dtos';
  
  // Services
  import { AccountService } from '.';
  
  // Entities
  import { AccountTypeEntity, CustomerEntity, DocumentTypeEntity } from '../persistence/entities';
  import { CustomerService } from './customer.service';
  // Jwt
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class SecurityService {
    constructor(
      private readonly customerService: CustomerService,
      private readonly accountService: AccountService,
      private readonly jwtService: JwtService
    ) {}
  
    signIn(user: SignInDto): string {
      const answer = this.customerService.findOneByEmailAndPassword(
        user.email,
        user.password,
      );
      if (answer) return this.jwtService.sign({id: answer.id});
      else throw new UnauthorizedException();
    }

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
  
      const customer = this.customerService.register(newCustomer);
  
      if (customer) {
        const accountType = new AccountTypeEntity();
        accountType.id = uuid();
        
        const newAccount = new CreateAccountDto();
        newAccount.customerId = customer.id;
        newAccount.accountTypeName = accountType.name;
        newAccount.balance = 0;
  
        const account = this.accountService.createAccount(newAccount);
  
        if (account) return this.jwtService.sign({id: account.id});
        else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }
  
    signOut(JWToken: string): void {
      throw new Error('Method not implemented.');
    }
  }